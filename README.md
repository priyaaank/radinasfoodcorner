# H1 File Updates

* Update [Menu][Update this file](https://github.com/priyaaank/radinasfoodcorner/blob/main/src/data/menu.json)
* Update [Reviews](https://github.com/priyaaank/radinasfoodcorner/blob/main/src/data/reviews.json)
* Update [Today's Special](https://github.com/priyaaank/radinasfoodcorner/blob/main/src/data/todays-special.json)


# H1 Technical Setup

## Command to setup S3 Bucket
 sh setup-s3-bucket.sh radinasfoodcorner ap-south-1

## Get Zone Id
aws route53 list-hosted-zones --query 'HostedZones[?Name==`your-domain.com.`].Id' --output text

## Other Details
BucketName - radinasfoodcorner
Domain - radinasfoodcorner.com

## Command to setup Domain certificates and cloudfront
./scripts/setup-cloudfront.sh <S3BucketName> <Domain> <ZoneID>
