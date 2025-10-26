#!/bin/bash
set -e

FORCE_INSTALL=false
USAGE="Usage: $0 [-f] (force reinstall even if already installed)"

# Parse command line arguments
while getopts "f" opt; do
    case $opt in
        f) FORCE_INSTALL=true ;;
        \?)
            echo "Invalid option: -$OPTARG"
            echo "$USAGE"
            exit 1
            ;;
    esac
done

# Check if AWS CLI is already installed
if command -v aws &> /dev/null && [ "$FORCE_INSTALL" = false ]; then
    echo "AWS CLI is already installed, skipping installation"
    aws --version
    exit 0
else
    if command -v aws &> /dev/null && [ "$FORCE_INSTALL" = true ]; then
        echo "AWS CLI is already installed, but force reinstall requested"
    else
        echo "AWS CLI not found, installing..."
    fi
fi

echo "Installing AWS CLI..."
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip -q awscliv2.zip
./aws/install
aws --version
