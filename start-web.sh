#!/bin/bash

echo "Starting Expo webpack dev server..."
EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0 CI=true npx expo start --web --port 19006 --non-interactive &

EXPO_PID=$!

echo "Waiting for webpack to compile..."
sleep 20

echo "Starting proxy server on port 5000..."
node proxy-server.js &

PROXY_PID=$!

wait $PROXY_PID
