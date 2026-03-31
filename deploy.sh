#!/bin/bash
set -e

SERVER="root@164.92.153.135"
REMOTE_DIR="/var/www/queloric"

echo "==> Building app..."
npm run build

echo "==> Syncing files to server..."
rsync -avz --delete \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='.env.local' \
  --exclude='.env' \
  ./ "$SERVER:$REMOTE_DIR/"

echo "==> Installing dependencies on server..."
ssh "$SERVER" "cd $REMOTE_DIR && npm install --omit=dev"

echo "==> Restarting PM2 process..."
ssh "$SERVER" "cd $REMOTE_DIR && pm2 reload ecosystem.config.js --update-env || pm2 start ecosystem.config.js"

echo "==> Saving PM2 process list..."
ssh "$SERVER" "pm2 save"

echo "==> Deploy complete."
