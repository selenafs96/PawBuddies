import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import { router } from 'expo-router';

import { scaleFont, scaleSize } from '../../src/constants/layout';

export default function VolunteerOnboarding1() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [telefono, setTelefono] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errores, setErrores] = useState({});

  const handleSiguiente = () => {
    const nuevosErrores = {};

    if (!nombre) {
      nuevosErrores.nombre = 'El nombre es obligatorio.';
    } else if (!validarNombre(nombre)) {
      nuevosErrores.nombre = 'El nombre no puede contener números.';
    }

    if (!email) {
      nuevosErrores.email = 'El email es obligatorio.';
    } else if (!validarEmail(email)) {
      nuevosErrores.email = 'Introduce un email válido con @.';
    }

    if (!contrasena) {
      nuevosErrores.contrasena = 'La contraseña es obligatoria.';
    } else if (!validarContrasena(contrasena)) {
      nuevosErrores.contrasena =
        'Mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.';
    }

    if (!telefono) {
      nuevosErrores.telefono = 'El teléfono es obligatorio.';
    } else if (!validarTelefono(telefono)) {
      nuevosErrores.telefono = 'El teléfono debe tener exactamente 9 números.';
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    setErrores({});
    router.push({
      pathname: '/(volunteers)/onboarding2',
      params: { nombre, email, contrasena, telefono },
    });
  };

  const validarNombre = (v) => /^[a-zA-ZÀ-ÿ\s]+$/.test(v);
  const validarEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const validarTelefono = (v) => /^\d{9}$/.test(v);
  const validarContrasena = (v) =>
    v.length >= 8 &&
    /[A-Z]/.test(v) &&
    /[a-z]/.test(v) &&
    /[0-9]/.test(v) &&
    /[^a-zA-Z0-9]/.test(v);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>

        {/* Progress bar — paso 1 activo */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, styles.progressActive]} />
          <View style={[styles.progressBar, styles.progressInactive]} />
          <View style={[styles.progressBar, styles.progressInactive]} />
          <View style={[styles.progressBar, styles.progressInactive]} />
        </View>

        <Text style={styles.headerTitle}>Completa los siguientes datos</Text>

        {/* Nombre */}
        <Text style={styles.label}>Nombre</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre Completo"
            placeholderTextColor="#999999"
            value={nombre}
            onChangeText={setNombre}
            autoCapitalize="words"
          />
        </View>
        {errores.nombre && <Text style={styles.errorText}>{errores.nombre}</Text>}

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="E-mail completo"
            placeholderTextColor="#999999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={styles.inputIconText}>@</Text>
        </View>
        {errores.email && <Text style={styles.errorText}>{errores.email}</Text>}

        {/* Contraseña */}
        <Text style={styles.label}>Contraseña</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Contraseña para tu cuenta"
            placeholderTextColor="#999999"
            value={contrasena}
            onChangeText={setContrasena}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => setShowPassword((v) => !v)}>
            <Image
              source={require('../../assets/icons/search.png')}
              style={[styles.inputIcon, { tintColor: showPassword ? '#3DBDB0' : '#999' }]}
            />
          </TouchableOpacity>
        </View>
        {errores.contrasena && <Text style={styles.errorText}>{errores.contrasena}</Text>}

        {/* Teléfono */}
        <Text style={styles.label}>Teléfono</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="¿Cuál es tu número de teléfono?"
            placeholderTextColor="#999999"
            value={telefono}
            onChangeText={setTelefono}
            keyboardType="phone-pad"
          />
          <Image
            source={require('../../assets/icons/perfil.png')}
            style={styles.inputIcon}
          />
        </View>
        {errores.telefono && <Text style={styles.errorText}>{errores.telefono}</Text>}

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.btnVolver}
            onPress={() => {
              if (router.canGoBack()) router.back();
              else router.push('/');
            }}
          >
            <Text style={styles.btnTextVolver}>Volver</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnSiguiente} onPress={handleSiguiente}>
            <Text style={styles.btnTextSiguiente}>Siguiente</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: scaleSize(25),
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scaleSize(20),
    marginBottom: scaleSize(24),
  },
  progressBar: {
    height: scaleSize(6),
    borderRadius: scaleSize(3),
    width: '23%',
  },
  progressActive: { backgroundColor: '#3DBDB0' },
  progressInactive: { backgroundColor: '#E0E0E0' },
  headerTitle: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(20),
    color: '#3DBDB0',
    fontWeight: '600',
    marginBottom: scaleSize(22),
  },
  label: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(13),
    color: '#222222',
    marginBottom: scaleSize(5),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: scaleSize(10),
    paddingHorizontal: scaleSize(12),
    height: scaleSize(42),
    marginBottom: scaleSize(14),
  },
  input: {
    flex: 1,
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(13),
    color: '#222222',
    outlineStyle: 'none',
  },
  inputIcon: {
    width: scaleSize(16),
    height: scaleSize(16),
    resizeMode: 'contain',
    tintColor: '#999999',
    marginLeft: scaleSize(8),
  },
  inputIconText: {
    fontSize: scaleFont(16),
    color: '#999999',
    marginLeft: scaleSize(8),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: scaleSize(30),
    marginTop: 'auto',
    paddingTop: scaleSize(16),
  },
  btnVolver: {
    flex: 1,
    backgroundColor: '#E8F8F5',
    paddingVertical: scaleSize(13),
    borderRadius: scaleSize(12),
    marginRight: scaleSize(15),
    alignItems: 'center',
  },
  btnSiguiente: {
    flex: 1,
    backgroundColor: '#3DBDB0',
    paddingVertical: scaleSize(13),
    borderRadius: scaleSize(12),
    alignItems: 'center',
  },
  btnTextVolver: {
    fontFamily: 'TiltNeon',
    color: '#3DBDB0',
    fontSize: scaleFont(15),
    fontWeight: '600',
  },
  btnTextSiguiente: {
    fontFamily: 'TiltNeon',
    color: '#FFFFFF',
    fontSize: scaleFont(15),
    fontWeight: '600',
  },
  errorText: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(11),
    color: '#E53935',
    marginTop: scaleSize(-10),
    marginBottom: scaleSize(8),
  },
});