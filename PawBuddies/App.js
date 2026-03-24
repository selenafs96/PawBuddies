import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { Platform } from 'react-native';
import { useFonts } from 'expo-font';
import AdoptaScreen from './src/screens/AdoptaScreen';
import AdoptaConfirmScreen from './src/screens/AdoptaConfirmScreen';

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

export default function App() {
  const [pantalla, setPantalla] = useState('confirm');

  const [fontsLoaded] = useFonts({
    TiltNeon: require('./assets/fonts/TiltNeon-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ErrorBoundary>
        {pantalla === 'adopta' ? (
          <AdoptaScreen onIrAConfirm={() => setPantalla('confirm')} />
        ) : (
          <AdoptaConfirmScreen onVolver={() => setPantalla('adopta')} />  
        )}  
      </ErrorBoundary>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: Platform.OS === 'web' ? '100vw' : '100%',
  },
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