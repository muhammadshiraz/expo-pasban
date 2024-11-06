import React, { createContext, useContext } from 'react';

// Create the context
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUserContext = () => {
  return useContext(UserContext);
};

// Mock provider for user data
export const UserProvider = ({ children }) => {
  const userData = {
    darkMode: false, // Or dynamically determine this value (e.g., from user preferences)
  };

  return (
    <UserContext.Provider value={{ userData }}>{children}</UserContext.Provider>
  );
};
