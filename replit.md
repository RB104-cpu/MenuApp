# Christoffel Menu App

## Overview
A React Native (Expo) web application for managing a restaurant menu. Users can add, edit, and delete menu items with course categorization (Starter, Main, Dessert) and pricing.

## Project Structure
- **App.js** - Main app component with navigation and state management
- **src/screens/** - Screen components
  - HomeScreen.js - Guest view with menu display, filtering, and average prices
  - ChefManagementScreen.js - Chef interface for managing menu items
  - DishFormScreen.js - Add/edit dish form
- **src/components/** - Reusable components  
  - DishCard.js - Individual dish display card
- **proxy-server.js** - Express proxy to forward port 5000 to Expo webpack (19006)
- **start-web.sh** - Startup script for web server
- **webpack.config.js** - Webpack configuration for Replit environment
- **CHANGELOG.md** - Detailed list of changes for PoE Part 3

## Tech Stack
- React Native (Expo SDK 48)
- React Navigation for routing
- AsyncStorage for local data persistence
- Express + http-proxy-middleware for port forwarding

## Development
- **Run locally**: `npm run web` or `bash start-web.sh`
- **Port Configuration**: App runs on port 5000 (proxies to Expo webpack on 19006)
- **Data Storage**: Uses AsyncStorage for client-side persistence

## Replit-Specific Configuration
- Webpack configured to allow all hosts for iframe proxy support
- Proxy server forwards requests from 5000 → 19006
- CI mode enabled for Metro bundler

## Recent Changes

### October 23, 2025 - PoE Part 3 Features
- ✅ Added average price calculation by course on home screen (using for loops)
- ✅ Created separate Chef Management screen for managing menu items
- ✅ Converted home screen to guest-only view with course filtering
- ✅ Implemented functions to organize code (getFilteredItems, handleDelete, etc.)
- ✅ Used global variables (COURSES array, STORAGE_KEY)
- ✅ All menu items stored and managed in arrays
- ✅ Created comprehensive CHANGELOG.md documenting all changes
- See CHANGELOG.md for detailed implementation notes

### October 6, 2025 - Initial Setup
- Imported from GitHub  
- Configured for Replit web environment
- Added proxy server for port management
- Set up webpack with proper host configuration
- Created deployment-ready startup script
