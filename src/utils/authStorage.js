import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_KEY = 'auth_data';

// Save the auth data (email and role)
export const storeAuthData = async (authData) => {
  try {
    await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(authData));
  } catch (e) {
    console.error('Failed to save auth data to storage', e);
  }
};

// Retrieve the auth data
export const getAuthData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(AUTH_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Failed to load auth data from storage', e);
    return null;
  }
};

// Clear the auth data (e.g. on logout)
export const clearAuthData = async () => {
  try {
    await AsyncStorage.multiRemove(['token', AUTH_KEY]); // Removed 'roleId'
  } catch (e) {
    console.error('Failed to clear auth data', e);
  }
};
