#!/bin/bash

# Build the Next.js application
echo "Building the application..."
npm run build

# Create a temporary directory for deployment
echo "Preparing files for deployment..."
DEPLOY_DIR="deploy_$(date +%s)"
mkdir -p "$DEPLOY_DIR"

# Copy necessary files
cp -r .next "$DEPLOY_DIR/"
cp -r public "$DEPLOY_DIR/"
cp -r app "$DEPLOY_DIR/"
cp -r components "$DEPLOY_DIR/"
cp -r lib "$DEPLOY_DIR/"
cp -r hooks "$DEPLOY_DIR/"
cp -r styles "$DEPLOY_DIR/"
cp package*.json "$DEPLOY_DIR/"
cp next.config.js "$DEPLOY_DIR/" 2>/dev/null || true
cp next.config.mjs "$DEPLOY_DIR/" 2>/dev/null || true

# Create a zip file
echo "Creating deployment package..."
ZIP_FILE="deployment_$(date +%Y%m%d_%H%M%S).zip"
zip -r "$ZIP_FILE" "$DEPLOY_DIR"

# Clean up
echo "Cleaning up..."
rm -rf "$DEPLOY_DIR"

echo "Deployment package created: $ZIP_FILE"
echo ""
echo "Next steps:"
echo "1. Upload $ZIP_FILE to your server"
echo "2. On your server, unzip it: unzip $ZIP_FILE"
echo "3. Navigate to the deployment directory: cd $DEPLOY_DIR"
echo "4. Install production dependencies: npm install --production"
echo "5. Start the application: npm start"
echo ""
echo "For a production environment, consider using PM2 to manage your Node.js process:"
echo "   npm install -g pm2"
echo "   pm2 start npm --name "qr-app" -- start"
echo "   pm2 save"
echo "   pm2 startup"
