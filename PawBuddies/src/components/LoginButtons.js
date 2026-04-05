import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function LoginButtons({ onSignIn, onSignUp }) {
  return (
    <View style={styles.container}>
      {/* Sign In Button */}
      <TouchableOpacity
        style={styles.signInButton}
        onPress={onSignIn}
        activeOpacity={0.8}
      >
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>

      {/* Sign Up Text */}
      <TouchableOpacity 
        onPress={onSignUp} 
        activeOpacity={0.7}
        style={styles.signUpContainer}
      >
        <Text style={styles.signUpText}>
          ¿No tienes ninguna cuenta?{' '}
          <Text style={styles.signUpLink}>Regístrate</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 343,
    alignSelf: 'center',
    gap: 16,
    marginTop: 60,
    marginBottom: 40,
  },
  signInButton: {
    width: 343,
    height: 46,
    backgroundColor: '#FFFFFF',
    borderRadius: 9,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 14,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  signInText: {
    fontFamily: 'Tilt Neon',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
    color: '#43B0A7',
  },
  signUpContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  signUpText: {
    fontFamily: 'Tilt Neon',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    color: '#000000',
  },
  signUpLink: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});