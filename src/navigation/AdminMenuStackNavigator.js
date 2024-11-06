import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AdminMenu from '@screens/AdminMenu/AdminMenuScreen';

const Stack = createStackNavigator();

const AdminMenuStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: false, // Disable gesture navigation for the Home stack
    }}
  >
    <Stack.Screen name="AdminMenu" component={AdminMenu} />
  </Stack.Navigator>
);

export default AdminMenuStackNavigator;
