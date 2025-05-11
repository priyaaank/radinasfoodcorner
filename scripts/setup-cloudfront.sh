#!/bin/bash

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "AWS CLI is not installed. Please install it first."
    exit 1
fi

# Check if required variables are set
if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ]; then
    echo "Usage: $0 <bucket-name> <domain-name> <hosted-zone-id>"
    echo "Example: $0 my-website-bucket example.com Z1234567890ABC"
    exit 1
fi

BUCKET_NAME=radinasfoodcorner
DOMAIN_NAME=radinasfoodcorner.com
HOSTED_ZONE_ID=Z02345361O0CA7FLXK2SH
S3_WEBSITE_ENDPOINT="$BUCKET_NAME.s3-website.${AWS_DEFAULT_REGION:-ap-south-1}.amazonaws.com"

echo "Setting up CloudFront distribution and DNS for $DOMAIN_NAME..."

# Request SSL Certificate
echo "Requesting SSL Certificate..."
CERTIFICATE_ARN=$(aws acm request-certificate \
    --domain-name "$DOMAIN_NAME" \
    --validation-method DNS \
    --region ap-south-1 \
    --query 'CertificateArn' \
    --output text)

echo "Certificate ARN: $CERTIFICATE_ARN"

# Wait for certificate details to be available
sleep 10

# Get DNS validation records
echo "Getting DNS validation records..."
VALIDATION_RECORDS=$(aws acm describe-certificate \
    --certificate-arn "$CERTIFICATE_ARN" \
    --region us-east-1 \
    --query 'Certificate.DomainValidationOptions[].ResourceRecord')

# Create validation DNS records
echo "Creating DNS validation records..."
for record in $(echo "$VALIDATION_RECORDS" | jq -r '.[] | @base64'); do
    DECODED_RECORD=$(echo "$record" | base64 --decode)
    NAME=$(echo "$DECODED_RECORD" | jq -r '.Name')
    VALUE=$(echo "$DECODED_RECORD" | jq -r '.Value')
    
    aws route53 change-resource-record-sets \
        --hosted-zone-id "$HOSTED_ZONE_ID" \
        --change-batch '{
            "Changes": [{
                "Action": "UPSERT",
                "ResourceRecordSet": {
                    "Name": "'$NAME'",
                    "Type": "CNAME",
                    "TTL": 300,
                    "ResourceRecords": [{
                        "Value": "'$VALUE'"
                    }]
                }
            }]
        }'
done

echo "Waiting for certificate validation (this may take several minutes)..."
aws acm wait certificate-validated --certificate-arn "$CERTIFICATE_ARN" --region us-east-1

# Create CloudFront distribution configuration file
DISTRIBUTION_CONFIG=$(cat <<EOF
{
    "CallerReference": "$(date +%s)",
    "Aliases": {
        "Quantity": 1,
        "Items": ["$DOMAIN_NAME"]
    },
    "DefaultRootObject": "index.html",
    "Origins": {
        "Quantity": 1,
        "Items": [
            {
                "Id": "S3Origin",
                "DomainName": "$S3_WEBSITE_ENDPOINT",
                "CustomOriginConfig": {
                    "HTTPPort": 80,
                    "HTTPSPort": 443,
                    "OriginProtocolPolicy": "http-only",
                    "OriginSslProtocols": {
                        "Quantity": 1,
                        "Items": ["TLSv1.2"]
                    }
                }
            }
        ]
    },
    "DefaultCacheBehavior": {
        "TargetOriginId": "S3Origin",
        "ViewerProtocolPolicy": "redirect-to-https",
        "AllowedMethods": {
            "Quantity": 2,
            "Items": ["GET", "HEAD"],
            "CachedMethods": {
                "Quantity": 2,
                "Items": ["GET", "HEAD"]
            }
        },
        "ForwardedValues": {
            "QueryString": false,
            "Cookies": {
                "Forward": "none"
            }
        },
        "MinTTL": 0,
        "DefaultTTL": 86400,
        "MaxTTL": 31536000,
        "Compress": true
    },
    "CustomErrorResponses": {
        "Quantity": 1,
        "Items": [
            {
                "ErrorCode": 404,
                "ResponsePagePath": "/index.html",
                "ResponseCode": "200",
                "ErrorCachingMinTTL": 300
            }
        ]
    },
    "Comment": "Distribution for $DOMAIN_NAME",
    "Enabled": true,
    "ViewerCertificate": {
        "ACMCertificateArn": "$CERTIFICATE_ARN",
        "SSLSupportMethod": "sni-only",
        "MinimumProtocolVersion": "TLSv1.2_2021"
    }
}
EOF
)

# Create temporary file for distribution config
TEMP_CONFIG_FILE=$(mktemp)
echo "$DISTRIBUTION_CONFIG" > "$TEMP_CONFIG_FILE"

# Create CloudFront distribution
echo "Creating CloudFront distribution..."
DISTRIBUTION_ID=$(aws cloudfront create-distribution \
    --distribution-config "file://$TEMP_CONFIG_FILE" \
    --query 'Distribution.Id' \
    --output text)

# Clean up temporary file
rm "$TEMP_CONFIG_FILE"

DISTRIBUTION_DOMAIN=$(aws cloudfront get-distribution \
    --id "$DISTRIBUTION_ID" \
    --query 'Distribution.DomainName' \
    --output text)

echo "CloudFront Distribution ID: $DISTRIBUTION_ID"
echo "CloudFront Domain: $DISTRIBUTION_DOMAIN"

# Create DNS records for the domain
echo "Creating DNS records..."
aws route53 change-resource-record-sets \
    --hosted-zone-id "$HOSTED_ZONE_ID" \
    --change-batch '{
        "Changes": [
            {
                "Action": "UPSERT",
                "ResourceRecordSet": {
                    "Name": "'$DOMAIN_NAME'",
                    "Type": "A",
                    "AliasTarget": {
                        "HostedZoneId": "Z2FDTNDATAQYW2",
                        "DNSName": "'$DISTRIBUTION_DOMAIN'",
                        "EvaluateTargetHealth": false
                    }
                }
            }
        ]
    }'

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Add these values to your GitHub repository secrets:"
echo "   CLOUDFRONT_DISTRIBUTION_ID=$DISTRIBUTION_ID"
echo ""
echo "2. Wait for DNS propagation (may take up to 48 hours)"
echo "   Your site will be available at:"
echo "   - https://$DOMAIN_NAME"
echo ""
echo "3. Update your deployment workflow with:"
echo "   - CLOUDFRONT_DISTRIBUTION_ID"
echo ""
echo "Note: Initial DNS propagation and SSL certificate validation may take 15-30 minutes." 