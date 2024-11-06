import React, { useState, useContext } from 'react';
import { View, StyleSheet, SafeAreaView, Alert } from 'react-native';
import ButtonComponent from '@components/ButtonComponent';
import Layout from '@components/Layout';
import HeadingComponent from '@components/HeadingComponent';
import TextComponent from '@components/TextComponent';
import CustomInput from '@components/CustomInput';
import { useNavigation } from '@react-navigation/native';
import SwitchTheme from '@screens/GetStartedScreen/switch-theme-code';
import { ThemeContext } from '@context/ThemeContext';
import tw from 'tailwind-react-native-classnames';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useDispatch } from 'react-redux';
import { resetPassword } from '@redux/actions/authActions';

const ForgotPasswordScreen = () => {
  const { getThemeColor } = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const dispatch = useDispatch();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigation = useNavigation();

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
    return emailPattern.test(email);
  };

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    } else {
      setEmailError('');
    }

    dispatch(resetPassword(email)); // Dispatch the reset password action

    // Show success alert and navigate to Login
    Alert.alert(
      'Success',
      'Check your email for password reset instructions.',
      [
        {
          text: 'OK',
          onPress: () => {
            setIsSubmitted(true); // Set submitted state to true
            navigation.navigate('Login'); // Navigate to the Login screen after pressing OK
          },
        },
      ],
    );
  };

  const handleSignIn = () => {
    // Implement your sign up logic here
    navigation.navigate('Login');
  };

  return (
    <Layout type="resetPassword" title="Forgot Password">
      <View style={styles.container}>
        <View
          style={
            (styles.headerContent,
            {
              alignItems: 'center',
              rowGap: 8,
              marginHorizontal: 'auto',
              width: 200,
              marginBottom: 16,
            })
          }
        >
          <EvilIcons name="unlock" size={100} color="#006EDA" />
          <HeadingComponent
            style={{ textAlign: 'center' }}
            size="h3"
            color={getThemeColor('h1')}
          >
            Can't sign in?
          </HeadingComponent>
          <TextComponent style={{ textAlign: 'center' }}>
            Enter the email associated with your account, and Pasban will send
            you a link to reset your password.
          </TextComponent>
        </View>
        <SafeAreaView style={[tw`flex-1 justify-start`, styles.formContainer]}>
          {!isSubmitted ? (
            <View style={styles.inputContainer}>
              <CustomInput
                type="email"
                placeholder="Email"
                value={email}
                onChangeText={(value) => {
                  setEmail(value);
                  if (emailError) setEmailError(''); // Clear error when user starts typing
                }}
              />
              {emailError ? (
                <TextComponent style={styles.errorMessage}>
                  {emailError}
                </TextComponent>
              ) : null}
              <View style={{ rowGap: 12 }}>
                <ButtonComponent
                  title="Reset Password"
                  onPress={handleResetPassword}
                  type="primary"
                  style={styles.button}
                />
                <ButtonComponent
                  title="Return to Sign In"
                  onPress={handleSignIn}
                  type="secondary"
                  style={styles.button}
                />
              </View>
            </View>
          ) : (
            <View style={styles.inputContainer}>
              <TextComponent style={styles.message}>
                If an account with that email address exists, you will receive a
                password reset email shortly.
              </TextComponent>
            </View>
          )}
        </SafeAreaView>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    minHeight: 'max-content',
    height: '100%',
  },
  headerContent: {},
  formContainer: {
    rowGap: 16,
  },
  inputContainer: {
    rowGap: 16,
  },
  button: {
    //marginTop: 16,
  },
  message: {
    textAlign: 'center',
    color: 'green', // Adjust this color according to your theme
  },
});

export default ForgotPasswordScreen;
