import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AdminMenu from '@screens/UserMenu/UserMenuScreen';

const Stack = createStackNavigator();

const UserMenuStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: false, // Disable gesture navigation for the Home stack
    }}
  >
    <Stack.Screen name="UserMenu" component={AdminMenu} />
  </Stack.Navigator>
);

export default UserMenuStackNavigator;
