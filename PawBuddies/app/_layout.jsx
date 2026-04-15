import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Slot } from 'expo-router';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import AuthProvider from '../providers/AuthProvider';
import { RegistroProvider } from '../contexts/RegistroUsuarioContext';

class ErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Error en la app</Text>
          <Text style={styles.errorText}>{String(this.state.error)}</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

const RootLayout = () => {
  const [fontsLoaded] = useFonts({
    TiltNeon: require('../assets/fonts/TiltNeon-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <RegistroProvider>
        <SafeAreaProvider>
          <StatusBar style="auto" />
          <ErrorBoundary>
            <Slot />
          </ErrorBoundary>
        </SafeAreaProvider>
      </RegistroProvider>
    </AuthProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  errorText: {
    textAlign: 'center',
  },
});
