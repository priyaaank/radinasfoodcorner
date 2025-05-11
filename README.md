To setup the HTTPS and WebSite

## Command to setup S3 Bucket
 sh setup-s3-bucket.sh radinasfoodcorner ap-south-1

## Get Zone Id
aws route53 list-hosted-zones --query 'HostedZones[?Name==`your-domain.com.`].Id' --output text

## Other Details
BucketName - radinasfoodcorner
Domain - radinasfoodcorner.com

## Command to setup Domain certificates and cloudfront
./scripts/setup-cloudfront.sh <S3BucketName> <Domain> <ZoneID>