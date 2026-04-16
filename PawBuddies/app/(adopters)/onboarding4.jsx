import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';

import { scaleFont, scaleSize } from '../../src/constants/layout';
import MyCheckBox from '../../src/components/MyCheckBox';
import { useRegistroUsuario } from '../../contexts/RegistroUsuarioContext';
import { supabase } from '../../src/lib/supabase';
import { useUsers } from '../../src/hooks/useUsers';

export default function Onboarding4() {
  const [inputDescriptionValue, setInputDescriptionValue] = useState('');
  const [tags, setTags] = useState([]);

  const { actualizarDatos, datosRegistro } = useRegistroUsuario();
  const { createUser } = useUsers();

  const handleAddTag = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue !== '' && !tags.includes(trimmedValue)) {
      setTags([...tags, trimmedValue]);
      setInputValue('');
    }
  };

  const handleRegister = async () => {
    actualizarDatos({ descripcion: inputDescriptionValue });

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: datosRegistro.email,
        password: datosRegistro.password,
      });

      if (authError) {
        alert('Error en el registro: ', authError.message);
      }

      if (authData.user) {
        const perfilUsuario = {
          id_usuario: authData.user.id,
          nombre: datosRegistro.nombre,
          apellidos: datosRegistro.apellidos,
          email: datosRegistro.email,
          telefono: datosRegistro.telefono,
          url_foto: datosRegistro.url_foto,
          rol: datosRegistro.rol,
          id_protectora: datosRegistro.id_protectora,
          localidad_preferida: datosRegistro.localidad_preferida,
          radio_maximo_km: datosRegistro.radio_maximo_km,
          descripcion: inputDescriptionValue,
          perros_propiedad: datosRegistro.perros_propiedad,
          gatos_propiedad: datosRegistro.gatos_propiedad,
          otros_propiedad: datosRegistro.otros_propiedad,
        };

        
        await createUser(perfilUsuario);

        router.push({
          pathname: '/confirmation',
          params: { message: '¡Perfil completado!' },
        });
      }
    } catch (err) {
      console.error('Error inesperado: ', err);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, styles.progressActive]} />
          <View style={[styles.progressBar, styles.progressActive]} />
          <View style={[styles.progressBar, styles.progressActive]} />
          <View style={[styles.progressBar, styles.progressActive]} />
        </View>
        <Text style={styles.headerTitle}>Adoptante</Text>

        <Text style={styles.sectionTitle}>Datos personales</Text>
        <Text style={styles.label}>Escribe algo sobre ti</Text>

        <View style={styles.descriptionContainer}>
          <TextInput
            style={styles.input}
            placeholder="Sobre mí"
            value={inputDescriptionValue}
            onChangeText={setInputDescriptionValue}
            onSubmitEditing={handleAddTag}
            returnKeyType="done"
            multiline={true}
            textAlignVertical="top"
            placeholderTextColor={'#666666'}
          />
        </View>

        <Text style={styles.sectionTitle}>Mascotas</Text>
        <Text style={styles.label}>¿Tienes otro animal de compañia?</Text>

        <MyCheckBox tag="Perro" />
        <MyCheckBox tag="Gato" />
        <MyCheckBox tag="Otro" />

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.btnVolver}
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.push('/');
              }
            }}
          >
            <Text style={styles.btnTextVolver}>Volver</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnSiguiente}
            onPress={handleRegister}
          >
            <Text style={styles.btnTextSiguiente}>Registrar</Text>
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
    marginBottom: scaleSize(30),
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
    fontSize: scaleFont(24),
    color: '#3DBDB0',
    fontWeight: '600',
    marginBottom: scaleSize(30),
  },
  sectionTitle: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(16),
    fontWeight: '700',
    color: '#222222',
    marginBottom: scaleSize(8),
  },
  label: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(14),
    color: '#666666',
    marginBottom: scaleSize(12),
  },
  descriptionContainer: {
    justifyContent: 'center',
    borderWidth: 1,
    padding: 10,
    borderColor: '#222222',
    borderRadius: scaleSize(10),
    paddingHorizontal: scaleSize(12),
    height: scaleSize(180),
    marginBottom: scaleSize(15),
  },
  input: {
    flex: 1,
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(14),
    height: scaleSize(160),
    outlineStyle: 'none',
    boxShadow: 'none',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: scaleSize(30),
    marginTop: scaleSize(40),
  },
  btnVolver: {
    flex: 1,
    backgroundColor: '#E8F8F5',
    paddingVertical: scaleSize(14),
    borderRadius: scaleSize(12),
    marginRight: scaleSize(15),
    alignItems: 'center',
  },
  btnSiguiente: {
    flex: 1,
    backgroundColor: '#3DBDB0',
    paddingVertical: scaleSize(14),
    borderRadius: scaleSize(12),
    alignItems: 'center',
  },
  btnTextVolver: {
    fontFamily: 'TiltNeon',
    color: '#3DBDB0',
    fontSize: scaleFont(16),
    fontWeight: '600',
  },
  btnTextSiguiente: {
    fontFamily: 'TiltNeon',
    color: '#FFFFFF',
    fontSize: scaleFont(16),
    fontWeight: '600',
  },
});
