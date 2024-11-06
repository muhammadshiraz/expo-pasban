import React, { useContext } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
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
        tw`flex-1 justify-between items-start px-7 py-16`,
        { backgroundColor: getThemeColor('primary') },
      ]}
    >
      <View
        style={[styles.header, tw`flex flex-col justify-between items-center`]}
      >
        <Image
          source={require('@assets/white-logo.png')} // Adjust path to your image
          style={[{ width: 148, height: 26 }, tw`self-start`]} // Added width and height
          resizeMode="contain"
        />
        <View style={styles.headerContent}>
          <HeadingComponent
            size="h1"
            style={tw`text-white`}
            color={getThemeColor('color')}
          >
            Let's get started
          </HeadingComponent>
          <Text style={[styles.subtitle, tw`text-xs font-normal`]}>
            Sign up or login to see what's happening near you
          </Text>
        </View>
      </View>
      <Image
        source={require('@assets/pasban-water-mark.png')} // Adjust path to your image
        style={[tw`self-center mt-6`, { width: 340, height: 161 }]} // Added width and height
        resizeMode="contain"
      />
      <Image
        source={require('@assets/audi-a4.png')} // Adjust path to your image
        style={{ width: 476, height: 267 }} // Added width and height
        resizeMode="contain"
      />
      <ButtonComponent
        title="Continue with Email"
        onPress={() => navigation.navigate('Violation')}
        type="default"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    rowGap: 32,
  },
  headerContent: {
    rowGap: 13,
  },
  media: {
    rowGap: 13,
  },
  subtitle: {
    color: '#AFA3FF',
    width: 158,
  },
});

export default GetStartedScreen;
