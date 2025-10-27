#!/bin/bash
set -e

USAGE="
Usage: $0 -b BUCKET_NAME -s SOURCE_PATH [-p TARGET_PATH]
  -b BUCKET_NAME         S3 bucket name (required)
  -s SOURCE_PATH         Local source file or directory to upload (required)
  -p TARGET_PATH         Target path in S3 bucket (optional, start with '/')
"

S3_BUCKET_NAME=""
SOURCE_PATH=""
TARGET_PATH=""

# Parse command line arguments
while getopts "b:s:p:a:" opt; do
    case $opt in
        b) S3_BUCKET_NAME="$OPTARG" ;;
        s) SOURCE_PATH="$OPTARG" ;;
        p) TARGET_PATH="$OPTARG" ;;
        \?)
            echo "Invalid option: -$OPTARG"
            echo "$USAGE"
            exit 1
            ;;
        :)
            echo "Option -$OPTARG requires an argument"
            echo "$USAGE"
            exit 1
            ;;
    esac
done

if [[ -z "$S3_BUCKET_NAME" || -z "$SOURCE_PATH" ]]; then
    echo "Error: Missing required arguments."
    echo "$USAGE"
    exit 1
fi

if [[ -n "$TARGET_PATH" && ! "$TARGET_PATH" =~ ^/ ]]; then
    echo "Error: TARGET_PATH must start with a forward slash '/'"
    echo "$USAGE"
    exit 1
fi

if [ ! -e "$SOURCE_PATH" ]; then
    echo "Error: Source path does not exist: $SOURCE_PATH"
    exit 1
fi

# Install AWS CLI if not already installed
bash "$(dirname "$0")/install-aws-cli.sh"

# Verify the target bucket exists
if ! aws s3api head-bucket --bucket "$S3_BUCKET_NAME" 2>/dev/null; then
    echo "Error: S3 bucket $S3_BUCKET_NAME does not exist or you don't have access to it."
    exit 1
else
    if [ -f "$SOURCE_PATH" ]; then
        # Source is a file
        if [ -z "$TARGET_PATH" ]; then
            # Upload to root of bucket with original filename
            filename=$(basename "$SOURCE_PATH")
            echo "Uploading file $SOURCE_PATH to S3 bucket $S3_BUCKET_NAME as $filename..."
            aws s3 cp "$SOURCE_PATH" "s3://$S3_BUCKET_NAME/$filename"
        else
            # Upload to specified path
            echo "Uploading file $SOURCE_PATH to S3 bucket $S3_BUCKET_NAME at path $TARGET_PATH..."
            aws s3 cp "$SOURCE_PATH" "s3://$S3_BUCKET_NAME$TARGET_PATH"
        fi
    else
        # Source is a directory
        # Ensure SOURCE_PATH has a trailing slash to upload contents, not the directory itself
        if [[ "$SOURCE_PATH" != */ ]]; then
            SOURCE_PATH="${SOURCE_PATH}/"
        fi
        
        if [ -z "$TARGET_PATH" ]; then
            # Upload to root of bucket
            echo "Uploading all contents from $SOURCE_PATH to S3 bucket $S3_BUCKET_NAME..."
            aws s3 sync "$SOURCE_PATH" "s3://$S3_BUCKET_NAME"
        else
            # Upload to specified path
            echo "Uploading all contents from $SOURCE_PATH to S3 bucket $S3_BUCKET_NAME at path $TARGET_PATH..."
            # Remove trailing slash from TARGET_PATH if present
            TARGET_PATH="${TARGET_PATH%/}"
            aws s3 sync "$SOURCE_PATH" "s3://$S3_BUCKET_NAME$TARGET_PATH"
        fi
    fi
    
    echo "Upload completed successfully."
fi
