#!/bin/bash

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "AWS CLI is not installed. Please install it first."
    exit 1
fi

# Check if required variables are set
if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Usage: $0 <bucket-name> <region>"
    echo "Example: $0 my-website-bucket us-east-1"
    exit 1
fi

BUCKET_NAME=$1
REGION=$2

echo "Creating and configuring S3 bucket for static website hosting..."
echo "Bucket: $BUCKET_NAME"
echo "Region: $REGION"

# Create the S3 bucket
echo "Creating S3 bucket..."
aws s3api create-bucket \
    --bucket $BUCKET_NAME \
    --region $REGION \
    --create-bucket-configuration LocationConstraint=$REGION

# Enable static website hosting
echo "Enabling static website hosting..."
aws s3api put-bucket-website \
    --bucket $BUCKET_NAME \
    --website-configuration '{
        "IndexDocument": {
            "Suffix": "index.html"
        },
        "ErrorDocument": {
            "Key": "index.html"
        }
    }'

# Create bucket policy for public read access
echo "Setting bucket policy for public access..."
aws s3api put-bucket-policy \
    --bucket $BUCKET_NAME \
    --policy '{
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "PublicReadGetObject",
                "Effect": "Allow",
                "Principal": "*",
                "Action": "s3:GetObject",
                "Resource": "arn:aws:s3:::'$BUCKET_NAME'/*"
            }
        ]
    }'

# Enable public access (disable block public access)
echo "Configuring public access settings..."
aws s3api put-public-access-block \
    --bucket $BUCKET_NAME \
    --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

# Configure CORS for the bucket
echo "Configuring CORS..."
aws s3api put-bucket-cors \
    --bucket $BUCKET_NAME \
    --cors-configuration '{
        "CORSRules": [
            {
                "AllowedHeaders": ["*"],
                "AllowedMethods": ["GET", "HEAD"],
                "AllowedOrigins": ["*"],
                "ExposeHeaders": [],
                "MaxAgeSeconds": 3000
            }
        ]
    }'

# Output the website URL
echo "✅ S3 bucket setup complete!"
echo "Website URL: http://$BUCKET_NAME.s3-website.$REGION.amazonaws.com"
echo ""
echo "Next steps:"
echo "1. Add these values to your GitHub repository secrets:"
echo "   AWS_REGION=$REGION"
echo "   S3_BUCKET=$BUCKET_NAME"
echo ""
echo "2. Set up CloudFront (recommended):"
echo "   - Create a CloudFront distribution pointing to the S3 website endpoint"
echo "   - Add the CloudFront distribution ID to GitHub secrets as CLOUDFRONT_DISTRIBUTION_ID"
echo ""
echo "3. Ensure your AWS credentials are set up in GitHub secrets:"
echo "   AWS_ACCESS_KEY_ID=your_access_key"
echo "   AWS_SECRET_ACCESS_KEY=your_secret_key" 