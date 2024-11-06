import React, { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext'; // Adjust path if needed
import { Button } from 'react-native'; // Adjust import based on your button component

const LightDarkToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Button
      title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      onPress={toggleTheme}
    />
  );
};

export default LightDarkToggle;
