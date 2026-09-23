HW18 reused
VPC: aws_vpc.main
Subnet: aws_subnet.public_app
EC2: aws_instance.app
RDS: aws_db_instance.postgres

HW18 infrastructure was reused. No second VM or database was created.

S3

Added private bucket:

stockmarket-hw18-storage

Object:

storage-check.txt

Enabled:

Public access block
Versioning
Server-side encryption
Lifecycle for old versions
Bootstrap

Created:

terraform/scripts/init.sh

The script only writes a timestamp to /var/log/project-bootstrap.log.

terraform plan:

No changes. Your infrastructure matches the configuration.

The existing EC2 was not replaced.
──(argine㉿kali)-[~/StockMarket/terraform]
└─$ aws s3api get-public-access-block \
--bucket stockmarket-hw18-storage
{
    "PublicAccessBlockConfiguration": {
        "BlockPublicAcls": true,
        "IgnorePublicAcls": true,
        "BlockPublicPolicy": true,
        "RestrictPublicBuckets": true
    }
}
                                                                                                                           
┌──(argine㉿kali)-[~/StockMarket/terraform]
└─$ aws s3api get-bucket-versioning \    
--bucket stockmarket-hw18-storage
{
    "Status": "Enabled"
}
                                                                                                                           
┌──(argine㉿kali)-[~/StockMarket/terraform]
└─$ aws s3api get-bucket-encryption \
> --bucket stockmarket-hw18-storage
{
    "ServerSideEncryptionConfiguration": {
        "Rules": [
            {
                "ApplyServerSideEncryptionByDefault": {
                    "SSEAlgorithm": "AES256"
                },
                "BucketKeyEnabled": false,
                "BlockedEncryptionTypes": {
                    "EncryptionType": [
                        "SSE-C"
                    ]
                }
            }
        ]
    }
}
                                                                                                                           
┌──(argine㉿kali)-[~/StockMarket/terraform]
└─$ aws s3api get-object \                      
  --bucket stockmarket-hw18-storage \
  --key storage-check.txt \
  /tmp/public-test.txt  
{
    "AcceptRanges": "bytes",
    "LastModified": "2026-09-22T11:30:40+00:00",
    "ContentLength": 30,
    "ETag": "\"ccb287ded22a35dc5071c47d152a7419\"",
    "ChecksumCRC32": "GxqauA==",
    "ChecksumType": "FULL_OBJECT",
    "VersionId": "null",
    "ContentType": "application/octet-stream",
    "ServerSideEncryption": "AES256",
    "Metadata": {},
    "TagCount": 4
}
                                                                                                                           
┌──(argine㉿kali)-[~/StockMarket/terraform]
└─$ cat /tmp/storage-check.txt
StocMarket HW19 storage check
                                                                                                                           
┌──(argine㉿kali)-[~/StockMarket/terraform]
└─$ aws s3api get-bucket-lifecycle-configuration \
> --bucket stockmarket-hw18-storage
{
    "TransitionDefaultMinimumObjectSize": "all_storage_classes_128K",
    "Rules": [
        {
            "ID": "expire-old-noncurrent-versions",
            "Filter": {
                "Prefix": ""
            },
            "Status": "Enabled",
            "NoncurrentVersionExpiration": {
                "NoncurrentDays": 7
            }
        }
    ]
}
┌──(argine㉿kali)-[~/StockMarket/terraform]
└─$ aws s3api get-object \
  --no-sign-request \
  --bucket stockmarket-hw18-storage \
  --key storage-check.txt \
  /tmp/anonymous-test.txt

aws: [ERROR]: An error occurred (AccessDenied) when calling the GetObject operation: Access Denied
