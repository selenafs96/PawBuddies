import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import LoginButtons from '../src/components/LoginButtons.js';
import LoginForm from '../src/components/LoginForm.js';
import LoginHeader from '../src/components/LoginHeader.js';
import { supabase } from '../src/lib/supabase.js'
import { router } from 'expo-router';
import { BackButton } from '../src/components/BackButton.js';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

const handleSignIn = async () => {
    setPasswordError('');
    // 1. Validaciones locales
    if (!email || !password) {
      alert('Por favor, introduce email y contraseña');
      return;
    }

    if (password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 dígitos');
      return;
    }

    // 2. Intento de inicio de sesión
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        alert('Error: ' + error.message);
        return;
      }

      if (data.session) {
        console.log(`Login exitoso, sesión creada: ${email}`);
        // Aquí el AuthProvider redirigirá a la página indicada.
      }
      
    } catch (err) {
      console.error('Error inesperado:', err);
    }
  };

  const handleSignUp = () => {
    // TODO: Navegar a pantalla de registro
    router.push('(adopters)/onboarding3');
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
          <BackButton color = '#FFFFFF'/>
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