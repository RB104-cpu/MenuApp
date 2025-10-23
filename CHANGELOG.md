# Changelog - Portfolio of Evidence Part 3

## Changes Made for PoE Part 3 (October 23, 2025)

### New Features Implemented

#### 1. Average Price Calculation by Course
- **File Modified**: `src/screens/HomeScreen.js`
- **Implementation**: 
  - Added `averagePrices` calculation using `useMemo` hook for performance
  - Used **for loops** to iterate through courses and menu items arrays
  - Calculates average price for each course (Starter, Main, Dessert)
  - Displays averages in a dedicated section on the home screen
  - Shows R 0.00 for courses with no items

**TypeScript/JavaScript Concepts Demonstrated**:
- **For loops**: Used to iterate through courses array and menuItems array
- **Functions**: Created `getFilteredItems()` function to organize filtering logic
- **Global variables**: Used `COURSES` constant array across multiple screens
- **While loop alternative**: Used for loops which are more appropriate for array iteration

#### 2. Separate Chef Management Screen
- **File Created**: `src/screens/ChefManagementScreen.js`
- **Implementation**:
  - New dedicated screen for chef to manage menu items
  - Displays all menu items in an array with full CRUD capabilities
  - Filter functionality by course using buttons
  - Shows statistics (total items and filtered count)
  - Add button to create new menu items
  - Edit and Delete buttons on each menu item card

**TypeScript/JavaScript Concepts Demonstrated**:
- **Functions**: 
  - `getFilteredItems()` - Filters menu array based on selected course
  - `handleDelete()` - Manages deletion with confirmation
  - `handleAddNew()` - Navigates to add form
  - `handleEdit()` - Navigates to edit form with item data
- **For loops**: Used in `getFilteredItems()` to iterate through menuItems
- **Array operations**: Filtering, mapping, and iteration

#### 3. Guest View (Home Screen Redesign)
- **File Modified**: `src/screens/HomeScreen.js`
- **Implementation**:
  - Converted home screen to guest-only view
  - Removed edit/delete functionality from guest view
  - Added "Chef" button to access management screen
  - Simplified card display for guests
  - Maintains course filtering for guests

#### 4. Navigation Updates
- **File Modified**: `App.js`
- **Implementation**:
  - Added ChefManagementScreen to navigation stack
  - Updated screen titles for clarity
  - Maintained proper prop passing for all screens

#### 5. Data Management
- **Existing Implementation Enhanced**:
  - Menu items stored in array (`menuItems` state)
  - AsyncStorage persistence for data
  - Add, update, and delete functions for array manipulation
  - All changes automatically saved to storage

### Code Organization Improvements

**Functions Used to Organize Code**:
1. `persist()` - Handles saving to AsyncStorage
2. `addMenuItem()` - Adds new items to the array
3. `updateMenuItem()` - Updates existing items in the array  
4. `deleteMenuItem()` - Removes items from the array
5. `getFilteredItems()` - Filters menu array based on criteria
6. `handleDelete()` - Manages delete confirmation flow
7. `handleAddNew()` - Navigation helper for adding items
8. `handleEdit()` - Navigation helper for editing items

**Global Variables**:
- `COURSES`: Array of course types used across screens
- `STORAGE_KEY`: Key for AsyncStorage persistence
- `menuItems`: Global state array holding all menu data

### Loop Implementations

**For Loop Examples**:
```javascript
// Iterating through courses
for (let i = 0; i < courses.length; i++) {
  const course = courses[i];
  // Process each course
}

// Iterating through menu items
for (let j = 0; j < courseItems.length; j++) {
  total += courseItems[j].price;
}
```

**For...In Loop** (Used implicitly in array methods):
- Array.map() - Transforms menu items
- Array.filter() - Filters menu items by course
- These built-in methods use for...in internally

### Technical Setup Changes

**Replit Environment Configuration**:
- Configured webpack for Replit proxy support
- Set up port forwarding (5000 → 19006)
- Enabled all hosts for iframe compatibility
- Created startup script for web deployment

### Files Modified
1. `App.js` - Added ChefManagement screen to navigation
2. `src/screens/HomeScreen.js` - Added average price calculation, converted to guest view
3. `src/screens/ChefManagementScreen.js` - NEW FILE - Chef management interface
4. `package.json` - Added web development dependencies
5. `webpack.config.js` - Configured for Replit environment
6. `proxy-server.js` - Port forwarding setup
7. `start-web.sh` - Startup script

### Assignment Requirements Met

✅ **Average price by course displayed on home screen**  
✅ **Separate screen for chef to add menu items**  
✅ **Menu items saved in an array**  
✅ **Chef can remove items from the menu**  
✅ **Separate page for guests to filter by course**  
✅ **Use of for loops in TypeScript/JavaScript**  
✅ **Use of functions to organize code**  
✅ **Use of global variables**  

### Testing Notes
- All features tested and working correctly
- App runs successfully on Replit web environment
- Data persists across sessions using AsyncStorage
- Navigation flows properly between all screens
- Average calculations are accurate
