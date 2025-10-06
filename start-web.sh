#!/bin/bash

echo "Starting proxy server on port 5000..."
node proxy-server.js &
PROXY_PID=$!

echo "Starting Expo webpack dev server..."
EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0 CI=true npx expo start --web --non-interactive &
EXPO_PID=$!

wait $PROXY_PID
