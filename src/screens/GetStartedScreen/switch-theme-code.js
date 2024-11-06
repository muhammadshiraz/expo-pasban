import React, { useContext } from 'react';
import { View, Text, Image, Button } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import ButtonComponent from '@components/ButtonComponent'; // Assuming Button component exists
import HeadingComponent from '@components/HeadingComponent'; // Assuming Heading component exists
import Layout from '@components/Layout'; // Assuming Layout component exists
import { ThemeContext } from '@context/ThemeContext';

const GetStartedScreen = ({ navigation }) => {
  const { theme, getThemeColor, toggleTheme } = useContext(ThemeContext);

  const handleGetStarted = () => {
    navigation.navigate('Home'); // Navigate to the HomeScreen
  };

  return (
    <View
      style={[
        tw`flex-1 justify-center items-center`,
        { backgroundColor: getThemeColor('background') },
      ]}
    >
      {/* <Text style={[tw`text-xl font-bold`, { color: getThemeColor('text') }]}>
          Welcome to the App!
        </Text>
        <Image
          source={require('@assets/logos/white-logo.svg')} // Adjust path to your image
          style={tw`w-32 h-32`}
          resizeMode="contain"
        />
        <HeadingComponent size="h1" color={getThemeColor('color')}>
          Let's get started
        </HeadingComponent>
        <ButtonComponent
          title="Learn More"
          onPress={() => navigation.navigate('Onboarding')}
          type="default"
        />
        <Text style={{ color: getThemeColor('color') }}>
          Current Theme: {theme}
        </Text> */}
      <Button
        title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        onPress={toggleTheme}
      />
    </View>
  );
};

export default GetStartedScreen;
