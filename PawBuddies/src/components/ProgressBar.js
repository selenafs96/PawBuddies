import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function ProgressBar({ currentStep = 1 }) {
  const steps = [1, 2, 3, 4];
  
  return (
    <View style={styles.container}>
      {steps.map((step) => (
        <View
          key={step}
          style={[
            styles.bar,
            step <= currentStep ? styles.active : styles.inactive,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    gap: 6,
    height: 6,
  },
  bar: {
    flex: 1,
    height: 6,
    borderRadius: 40,
  },
  active: {
    backgroundColor: '#43B0A7',
  },
  inactive: {
    backgroundColor: '#D9D9D9',
  },
});