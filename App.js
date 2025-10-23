
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './src/screens/HomeScreen';
import DishFormScreen from './src/screens/DishFormScreen';
import ChefManagementScreen from './src/screens/ChefManagementScreen';

const Stack = createStackNavigator();
const STORAGE_KEY = '@christoffel_menu';

export default function App() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          setMenuItems(JSON.parse(raw));
        } else {
          // Seed with dummy data
          const seed = [
            { id: '1', name: 'Beetroot Carpaccio', description: 'Thin sliced beetroot with feta and walnuts', course: 'Starter', price: 85.00 },
            { id: '2', name: 'Pan-seared Lamb', description: 'Served with rosemary jus and roasted veg', course: 'Main', price: 220.00 },
            { id: '3', name: 'Vanilla Panna Cotta', description: 'Creamy panna cotta with berry compote', course: 'Dessert', price: 75.00 }
          ];
          setMenuItems(seed);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
        }
      } catch (e) {
        console.warn('Failed to load menu', e);
      }
    })();
  }, []);

  const persist = async (items) => {
    setMenuItems(items);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch(e) {
      console.warn('Failed to save menu', e);
    }
  };

  const addMenuItem = (item) => {
    const newItem = { ...item, id: Date.now().toString() };
    persist([newItem, ...menuItems]);
  };

  const updateMenuItem = (updated) => {
    const next = menuItems.map(m => m.id === updated.id ? updated : m);
    persist(next);
  };

  const deleteMenuItem = (id) => {
    const next = menuItems.filter(m => m.id !== id);
    persist(next);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
        <Stack.Screen name="Home" options={{ title: 'Guest Menu' }}>
          {(props) => <HomeScreen {...props} menuItems={menuItems} />}
        </Stack.Screen>
        <Stack.Screen name="ChefManagement" options={{ title: 'Chef Management' }}>
          {(props) => <ChefManagementScreen {...props} menuItems={menuItems} onDelete={deleteMenuItem} />}
        </Stack.Screen>
        <Stack.Screen name="DishForm" options={{ title: 'Add / Edit Dish' }}>
          {(props) => <DishFormScreen {...props} addMenuItem={addMenuItem} updateMenuItem={updateMenuItem} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
