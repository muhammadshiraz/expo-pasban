import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GSMMenu from '@screens/GSMMenu/GSMMenuScreen';

const Stack = createStackNavigator();

const GSMMenuStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: false, // Disable gesture navigation for the Home stack
    }}
  >
    <Stack.Screen name="GSMMenu" component={GSMMenu} />
  </Stack.Navigator>
);

export default GSMMenuStackNavigator;
