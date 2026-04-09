import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import LoginButtons from '../components/Login/LoginButtons';
import LoginForm from '../components/Login/LoginForm';
import LoginHeader from '../components/Login/LoginHeader';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleSignIn = () => {
    // Validar password
    if (password.length < 6) {
      setPasswordError('Password debe ser mayor a 6 dígitos');
      return;
    }

    if (email && password) {
      // TODO: Conectar con Supabase para autenticación
      console.log('Login:', { email, password });
      // navigation.navigate('Home');
    }
  };

  const handleSignUp = () => {
    // TODO: Navegar a pantalla de registro
    console.log('Navigate to SignUp');
    // navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Background Rectangle 52 */}
        <View style={styles.background}>
          {/* Header - Status Bar + Logo + Title */}
          <LoginHeader />

          {/* Form - Email + Password */}
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            passwordError={passwordError}
            setPasswordError={setPasswordError}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />

          {/* Buttons - Sign In + Sign Up */}
          <LoginButtons
            onSignIn={handleSignIn}
            onSignUp={handleSignUp}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#43B0A7',
  },
  scrollContent: {
    flexGrow: 1,
  },
  background: {
    // Rectangle 52
    width: 393,
    minHeight: 852,
    backgroundColor: '#43B0A7',
    alignSelf: 'center',
  },
});