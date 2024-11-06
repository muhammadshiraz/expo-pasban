import React, { useState, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import ButtonComponent from '@components/ButtonComponent';
import Layout from '@components/Layout';
import HeadingComponent from '@components/HeadingComponent';
import TextComponent from '@components/TextComponent';
import CustomInput from '@components/CustomInput';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '@context/ThemeContext';
import tw from 'tailwind-react-native-classnames';
import Ionicons from '@expo/vector-icons/Ionicons';
import ModalComponent from '@components/ModalComponent';

const EnterNewPasswordScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { getThemeColor } = useContext(ThemeContext);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    containsNameOrEmail: getThemeColor('text'),
    minLength: getThemeColor('text'),
    containsSymbolOrNumber: getThemeColor('text'),
  });
  const navigation = useNavigation();

  useEffect(() => {
    validatePassword();
  }, [newPassword, confirmPassword]);

  const validatePassword = () => {
    const criteria = {
      containsNameOrEmail: getThemeColor('text'),
      minLength: getThemeColor('text'),
      containsSymbolOrNumber: getThemeColor('text'),
    };

    if (newPassword === '' && confirmPassword === '') {
      setPasswordCriteria(criteria);
      return;
    }

    // Example conditions, adjust as needed for your specific validation
    if (newPassword.length >= 8) {
      criteria.minLength = '#3BCC70';
    } else {
      criteria.minLength = '#FF2E2E';
    }

    if (/[^A-Za-z0-9]/.test(newPassword) || /\d/.test(newPassword)) {
      criteria.containsSymbolOrNumber = '#3BCC70';
    } else {
      criteria.containsSymbolOrNumber = '#FF2E2E';
    }

    // You can add your own logic to check for name or email in the password
    // For this example, let's assume we have `userName` and `userEmail` variables
    const userName = 'user'; // Example user name, replace with actual value
    const userEmail = 'user@example.com'; // Example user email, replace with actual value

    if (!newPassword.includes(userName) && !newPassword.includes(userEmail)) {
      criteria.containsNameOrEmail = '#3BCC70';
    } else {
      criteria.containsNameOrEmail = '#FF2E2E';
    }

    setPasswordCriteria(criteria);
  };

  const handleSetNewPassword = () => {
    setIsModalVisible(true);
  };

  const handleSignIn = () => {
    // Navigate to the login screen
    navigation.navigate('Login');
  };

  return (
    <Layout type="resetPassword" title="Enter New Password">
      <View style={styles.container}>
        <View
          style={
            (styles.headerContent,
            {
              width: 200,
              alignItems: 'left',
              rowGap: 8,
              marginBottom: 16,
            })
          }
        >
          <HeadingComponent
            style={{ textAlign: 'left', paddingRight: 30 }}
            size="h3"
            color={getThemeColor('h1')}
          >
            Create your new password
          </HeadingComponent>
          <TextComponent style={{ textAlign: 'left' }}>
            Your new password must be different from previous password.
          </TextComponent>
        </View>
        <SafeAreaView style={[tw`flex-1 justify-start`, styles.formContainer]}>
          {!isSubmitted ? (
            <View style={styles.inputContainer}>
              <CustomInput
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <CustomInput
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <View style={{ rowGap: 8 }}>
                <View style={styles.passwordHintContainer}>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={14}
                    color={passwordCriteria.containsNameOrEmail}
                  />
                  <Text
                    style={[
                      tw`text-xs font-normal`,
                      { color: passwordCriteria.containsNameOrEmail },
                    ]}
                  >
                    Must not contain your name or email
                  </Text>
                </View>
                <View style={styles.passwordHintContainer}>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={14}
                    color={passwordCriteria.minLength}
                  />
                  <Text
                    style={[
                      tw`text-xs font-normal`,
                      { color: passwordCriteria.minLength },
                    ]}
                  >
                    At least 8 characters
                  </Text>
                </View>
                <View style={styles.passwordHintContainer}>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={14}
                    color={passwordCriteria.containsSymbolOrNumber}
                  />
                  <Text
                    style={[
                      tw`text-xs font-normal`,
                      { color: passwordCriteria.containsSymbolOrNumber },
                    ]}
                  >
                    Contains a symbol or a number
                  </Text>
                </View>
              </View>
              <View style={{ rowGap: 12 }}>
                <ButtonComponent
                  title="Create New Password"
                  onPress={handleSetNewPassword}
                  type="primary"
                  style={styles.button}
                />
              </View>
            </View>
          ) : (
            <View style={styles.inputContainer}>
              <TextComponent style={styles.message}>
                Your password has been reset successfully.
              </TextComponent>
              <ButtonComponent
                title="Return to Sign In"
                onPress={handleSignIn}
                type="secondary"
                style={styles.button}
              />
            </View>
          )}
        </SafeAreaView>
      </View>
      <ModalComponent
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onButtonPress={handleSignIn} // Pass custom function here
      >
        <View style={{ alignItems: 'center', marginBottom: 50, rowGap: 16 }}>
          <Ionicons name="shield-checkmark-sharp" size={75} color="#1FC072" />
          <View style={{ alignItems: 'center', rowGap: 5, width: 220 }}>
            <HeadingComponent size="h3" color={getThemeColor('h3')}>
              Password changed!
            </HeadingComponent>
            <TextComponent
              style={{ textAlign: 'center', paddingHorizontal: 45 }}
            >
              You successfully updated your password.
            </TextComponent>
          </View>
        </View>
      </ModalComponent>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    minHeight: 'max-content',
  },
  headerContent: {},
  formContainer: {
    rowGap: 16,
  },
  inputContainer: {
    rowGap: 16,
  },
  passwordHintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    //marginHorizontal: 8,
    columnGap: 7,
  },
  button: {
    //marginTop: 16,
  },
  message: {
    textAlign: 'center',
    color: 'green', // Adjust this color according to your theme
  },
});

export default EnterNewPasswordScreen;
