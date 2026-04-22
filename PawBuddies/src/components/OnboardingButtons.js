import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

export default function OnboardingButtons({ onBack, onNext }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonBack}
        onPress={onBack}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonBackText}>Volver</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonNext}
        onPress={onNext}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonNextText}>Siguiente</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    gap: 13,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  buttonBack: {
    width: 165,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: '#E8F7F6',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  buttonBackText: {
    color: '#43B0A7',
    fontSize: 14,
    fontFamily: 'Tilt Neon',
    fontWeight: '400',
  },
  buttonNext: {
    width: 165,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: '#43B0A7',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  buttonNextText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Tilt Neon',
    fontWeight: '400',
  },
});