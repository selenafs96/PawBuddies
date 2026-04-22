import React, { useState } from 'react';
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import ProgressBar from '../../components/ProgressBar';
import OnboardingButtons from '../../components/OnboardingButtons';
import OnboardingForm from '../../components/OnboardingForm';

export default function Onboarding1() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
  });

  const handleBack = () => {
    console.log('Volver a pantalla anterior');
  };

  const handleNext = () => {
    console.log('Datos del formulario:', formData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.progressContainer}>
          <ProgressBar currentStep={1} />
        </View>

        <View style={styles.formWrapper}>
          <OnboardingForm 
            title="Completa los siguientes datos"
            onSubmit={(data) => setFormData(data)}
          />
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <OnboardingButtons
          onBack={handleBack}
          onNext={handleNext}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingTop: 16,
    paddingBottom: 120,
  },
  progressContainer: {
    marginBottom: 26,
  },
  formWrapper: {
    marginBottom: 40,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 24,
    left: 25,
    right: 25,
  },
});