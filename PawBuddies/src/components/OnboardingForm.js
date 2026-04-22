import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function OnboardingForm({ 
  title = "Completa los siguientes datos",
  onSubmit 
}) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.formContainer}>
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre Completo"
            placeholderTextColor="#848484"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Email</Text>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={styles.inputFlex}
              placeholder="E-mail completo"
              placeholderTextColor="#848484"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <MaterialCommunityIcons
              name="email"
              size={15}
              color="#848484"
            />
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Contraseña</Text>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={styles.inputFlex}
              placeholder="Contraseña para tu cuenta"
              placeholderTextColor="#848484"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <MaterialCommunityIcons
                name={showPassword ? 'eye' : 'eye-off'}
                size={16}
                color="#848484"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Teléfono</Text>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={styles.inputFlex}
              placeholder="¿Cuál es tu número de teléfono?"
              placeholderTextColor="#848484"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <MaterialCommunityIcons
              name="phone"
              size={16}
              color="#848484"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 26,
  },
  title: {
    fontSize: 22,
    fontFamily: 'TiltNeon',
    fontWeight: '400',
    color: '#43B0A7',
  },
  formContainer: {
    flexDirection: 'column',
    gap: 15,
  },
  fieldGroup: {
    flexDirection: 'column',
    gap: 8,
  },
  fieldLabel: {
    fontSize: 14,
    fontFamily: 'TiltNeon',
    fontFamily: 'Tilt Neon',
    fontWeight: '400',
    color: '#000000',
  },
  input: {
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#848484',
    fontFamily: 'TiltNeon',
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
  },
  inputWithIcon: {
    width: '100%',
    height: 42,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#848484',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF',
  },
  inputFlex: {
    flex: 1,
    fontFamily: 'TiltNeon',
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
    padding: 0,
  },
});