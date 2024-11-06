import React, { createContext } from 'react';

// Define theme colors, focusing only on the light mode
const themeColors = {
  light: {
    primary: '#006EDA',
    secondary: '#ffc107',
    background: '#ffffff',
    background1: '#efeeee',
    background2: '#ffffff',
    boxBackground: '#ffffff',
    white: '#ffffff',
    h1: '#000000',
    h3: '#000000',
    text: '#787878',
    actionText: '#000000',
    icon: '#000000',
    textInput: '#F8FAFC',
    textInputColor: '#000000',
    placeholder: '#9EACBF',
    authTextColor: '#000000',
    pickerModalBackground: '#000000',
    border1: '#EEF2F6',
    border2: '#DBDBDB',
    boxText: '#10182B',
    iconBox: '#F3F3F3',
    iconBoxActiveColor: '#FFFFFF',
    iconBoxColor: '#264A6C',
    shadow: '',
  },
};

// Create context with default values for light mode
const ThemeContext = createContext({
  theme: 'light',
  getThemeColor: (colorName) => themeColors['light'][colorName],
});

const ThemeProvider = ({ children }) => {
  // Directly set the theme to 'light'
  const theme = 'light';

  // Function to get colors based on the light theme
  const getThemeColor = (colorName) => themeColors[theme][colorName];

  return (
    <ThemeContext.Provider value={{ theme, getThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
