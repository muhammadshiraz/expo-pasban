import React, { useCallback, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import AppNavigator from '@navigation/AppNavigator';
import store from '@redux/store';
import { ThemeProvider } from '@context/ThemeContext';
import * as SplashScreen from 'expo-splash-screen';
import dayjs from 'dayjs';
import Toast from 'react-native-toast-message';

// Prevent auto-hiding of splash screen initially
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState('GetStarted');

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Simulate a delay (e.g., to simulate loading fonts, etc.)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Check if the app has been launched before (first launch logic)
        const isFirstLaunch = await AsyncStorage.getItem('isFirstLaunch');

        if (isFirstLaunch === null) {
          // First time launching the app, show GetStarted screen
          await AsyncStorage.setItem('isFirstLaunch', 'false');
          setInitialRoute('GetStarted'); // Set GetStarted for first-time launch
        } else {
          // Check if the user has a valid session and route based on role
          const storedAuthData = await AsyncStorage.getItem('authData');
          if (storedAuthData) {
            const { role, sessionExpiry } = JSON.parse(storedAuthData);

            // Check if the session is still valid
            if (dayjs().isBefore(dayjs(sessionExpiry))) {
              // Session is still valid, route based on role
              switch (role) {
                case 'admin':
                  setInitialRoute('AdminMenu');
                  break;
                case 'gsm':
                  setInitialRoute('GSMMenu');
                  break;
                case 'user':
                  setInitialRoute('UserMenu');
                  break;
                default:
                  setInitialRoute('Login'); // Fallback if role is not recognized
                  break;
              }
            } else {
              // Session has expired, clear session and go to Login
              await AsyncStorage.removeItem('authData');
              setInitialRoute('Login');
            }
          } else {
            // No session data, go to Login
            setInitialRoute(true);
          }
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true); // App is ready to be displayed
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontsLoaded) {
      await SplashScreen.hideAsync(); // Hide the splash screen when app is ready
    }
  }, [appIsReady, fontsLoaded]);

  if (!appIsReady || !fontsLoaded) {
    // Return null or a loading screen until the app is ready
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider>
        <View style={styles.container} onLayout={onLayoutRootView}>
          <AppNavigator initialRouteName={initialRoute} />
        </View>
      </ThemeProvider>
      <Toast />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
});
