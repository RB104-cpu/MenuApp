import React, { useEffect, useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './src/screens/HomeScreen';
import DishFormScreen from './src/screens/DishFormScreen';
import ChefManagementScreen from './src/screens/ChefManagementScreen';

const Stack = createStackNavigator();
const STORAGE_KEY = '@christoffel_menu';

// Validation function
const validateMenuItem = (item) => {
  if (!item.name?.trim() || !item.description?.trim() || !item.course || !item.price) {
    throw new Error('All fields are required');
  }
  if (item.price < 0) {
    throw new Error('Price must be positive');
  }
  if (typeof item.price !== 'number') {
    throw new Error('Price must be a number');
  }
};

// Storage service
const MenuService = {
  save: async (items) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save menu', e);
      throw e;
    }
  },
  load: async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.error('Failed to load menu', e);
      throw e;
    }
  }
};

// Initial seed data
const getInitialData = () => [
  { 
    id: '1', 
    name: 'Beetroot Carpaccio', 
    description: 'Thin sliced beetroot with feta and walnuts', 
    course: 'Starter', 
    price: 85.00 
  },
  { 
    id: '2', 
    name: 'Pan-seared Lamb', 
    description: 'Served with rosemary jus and roasted veg', 
    course: 'Main', 
    price: 220.00 
  },
  { 
    id: '3', 
    name: 'Vanilla Panna Cotta', 
    description: 'Creamy panna cotta with berry compote', 
    course: 'Dessert', 
    price: 75.00 
  }
];

export default function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const stored = await MenuService.load();
      if (stored) {
        setMenuItems(stored);
      } else {
        const seed = getInitialData();
        setMenuItems(seed);
        await MenuService.save(seed);
      }
    } catch (e) {
      console.warn('Failed to load menu', e);
      // Fallback to seed data
      const seed = getInitialData();
      setMenuItems(seed);
    } finally {
      setLoading(false);
    }
  };

  const persist = useCallback(async (items) => {
    setMenuItems(items);
    try {
      await MenuService.save(items);
    } catch(e) {
      console.error('Failed to save menu', e);
      // You could add user feedback here (Toast, Alert, etc.)
    }
  }, []);

  const addMenuItem = useCallback((item) => {
    try {
      validateMenuItem(item);
      const newItem = { 
        ...item, 
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      persist([newItem, ...menuItems]);
      return true;
    } catch (error) {
      console.error('Validation failed:', error.message);
      return false;
    }
  }, [menuItems, persist]);

  const updateMenuItem = useCallback((updated) => {
    try {
      validateMenuItem(updated);
      const next = menuItems.map(m => m.id === updated.id ? updated : m);
      persist(next);
      return true;
    } catch (error) {
      console.error('Validation failed:', error.message);
      return false;
    }
  }, [menuItems, persist]);

  const deleteMenuItem = useCallback((id) => {
    const next = menuItems.filter(m => m.id !== id);
    persist(next);
  }, [menuItems, persist]);

  if (loading) {
    return null; // Or your loading component
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
        <Stack.Screen name="Home" options={{ title: 'Guest Menu' }}>
          {(props) => (
            <HomeScreen 
              {...props} 
              menuItems={menuItems} 
              loading={loading}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="ChefManagement" options={{ title: 'Chef Management' }}>
          {(props) => (
            <ChefManagementScreen 
              {...props} 
              menuItems={menuItems} 
              onDelete={deleteMenuItem} 
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="DishForm" options={{ title: 'Add / Edit Dish' }}>
          {(props) => (
            <DishFormScreen 
              {...props} 
              addMenuItem={addMenuItem} 
              updateMenuItem={updateMenuItem} 
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
