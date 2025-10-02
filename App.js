import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddDishScreen from './screens/AddDishScreen';

const Stack = createStackNavigator();

export default function App() {
  const [menuItems, setMenuItems] = useState([]);

  const addMenuItem = (item) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
    };
    setMenuItems([...menuItems, newItem]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="Home" options={{ title: 'Christoffel Menu' }}>
          {(props) => <HomeScreen {...props} menuItems={menuItems} />}
        </Stack.Screen>
        <Stack.Screen name="AddDish" options={{ title: 'Add Menu Item' }}>
          {(props) => <AddDishScreen {...props} addMenuItem={addMenuItem} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
