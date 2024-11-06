import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  SafeAreaView,
  Text,
  ScrollView,
} from 'react-native';
import ButtonComponent from '@components/ButtonComponent';
import tw from 'tailwind-react-native-classnames';
import Layout from '@components/Layout';
import HeadingComponent from '@components/HeadingComponent';
import TextComponent from '@components/TextComponent';
import CustomInput from '@components/CustomInput';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '@context/ThemeContext';
import AuthText from '@components/AuthText';
import navigateToRoleBasedScreen from '@utils/navigationHandler';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '@redux/actions/authActions';

const LoginScreen = () => {
  const { getThemeColor } = useContext(ThemeContext);
  const navigation = useNavigation();
  const [email, setEmail] = useState('sofia.majeed2@unilever.com');
  const [password, setPassword] = useState('2313C741');
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    // If user data is available after login, navigate based on the role
    if (user) {
      const { roleId } = user;
      // Navigate to the correct screen based on the role
      navigateToRoleBasedScreen(roleId, navigation);
    }
  }, [user, navigation]);

  const handleLogin = () => {
    if (email && password) {
      dispatch(userLogin(email, password)); // Trigger login action
    } else {
      Alert.alert('Error', 'Please enter both email and password.');
    }
  };

  const handleResetPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleSignUp = () => {
    // Implement your sign up logic here
    navigation.navigate('Signup');
  };

  return (
    <Layout type="auth" title="Login">
      <View style={styles.container}>
        <View style={styles.headerContent}>
          <HeadingComponent size="h1" color={getThemeColor('h1')}>
            Sign in to Pasban
          </HeadingComponent>
          <View>
            <TextComponent>
              Welcome back! Please enter your details.
            </TextComponent>
          </View>
        </View>
        <SafeAreaView style={[tw`flex-1 justify-start`, styles.formContainer]}>
          <View style={styles.inputContainer}>
            <CustomInput
              type="email"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <CustomInput
              type="password"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
            />
            <AuthText textType="forgotPassword" onPress={handleResetPassword} />
            <ButtonComponent
              title={loading ? <Text>Loading...</Text> : <Text>Sign in</Text>}
              onPress={handleLogin}
              type="primary"
            />
            <AuthText textType="signUp" onPress={handleSignUp} />
          </View>
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
  },
  headerContent: {
    rowGap: 8,
    marginBottom: 18,
  },
  formContainer: {
    rowGap: 16,
  },
  inputContainer: {
    rowGap: 16,
  },
});

export default LoginScreen;
