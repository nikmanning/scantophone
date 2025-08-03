#!/bin/bash

# FTP credentials
FTP_USER="hellonik@buildviralapps.com"
FTP_PASS="Twitter2121!"
FTP_HOST="ftp.buildviralapps.com"
REMOTE_DIR="scantophone"
LOCAL_DIR=".next"

# Create a temporary file with FTP commands
TEMP_SCRIPT=$(mktemp)

cat > $TEMP_SCRIPT <<EOF
set ftp:ssl-allow no
set ftp:use-feat no
set ssl:verify-certificate no
open -u $FTP_USER,$FTP_PASS $FTP_HOST
cd /
mkdir -p $REMOTE_DIR
cd $REMOTE_DIR
mirror -R $LOCAL_DIR ./
bye
EOF

# Execute lftp with the script
lftp -f $TEMP_SCRIPT

# Clean up
rm -f $TEMP_SCRIPT

echo "Upload completed!"
