import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';

import { scaleFont, scaleSize } from '../../src/constants/layout.js';
import { BackButton } from '../../src/components/BackButton.js';
import { useAnimals } from '../../src/hooks/useAnimals.js';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dropdown } from 'react-native-element-dropdown';
import { supabase } from '../../src/lib/supabase.js';
import { router } from 'expo-router';

// testId: solo para desarrollo, cuando se renderiza sin navegación
export default function AnimalRegister() {
  const insets = useSafeAreaInsets();
  const styles = createStyles(insets);

    const [newAnimalForm, setNewAnimalForm] = useState({
    nombre: '',
    genero: '',
    edad: '',
    tamano: '',
    raza: '',
    presentacion: '',
    url_foto: '',
    caracter: '',
  });
  const [stateDropdownValue, setStateDropdownValue] = useState(null);
  const [specieDropdownValue, setSpecieDropdownValue] = useState(null);
  const [idProtectora, setIdProtectora] = useState(null);

  const { addAnimal } = useAnimals();

  useEffect(() => {
    const cargarDatosSesion = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
       const userId = session.user.id;

      const {data, error} = await supabase
        .from('usuario')
        .select('id_protectora')
        .eq('id_usuario', userId)
        .single();

        if(data && data.id_protectora) {
            setIdProtectora(data.id_protectora)
        } else {
            console.log('No se encontró id_protectora para este usuario')
        }
    };
    cargarDatosSesion();
  }, []);

  const STATES = [
    { label: 'Adoptable', value: 'Adoptable' },
    { label: 'No Adoptable', value: 'No Adoptable' },
  ];
  const SPECIES = [
    { label: 'Perro', value: 'Perro' },
    { label: 'Gato', value: 'Gato' },
  ];

  const handleChange = (field, value) => {
    setNewAnimalForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const newAnimal = {
        nombre: newAnimalForm.nombre,
        genero: newAnimalForm.genero,
        edad: Number.parseInt(newAnimalForm.edad) || 0,
        tamano: newAnimalForm.tamano,
        raza: newAnimalForm.raza,
        presentacion: newAnimalForm.presentacion,
        caracter: newAnimalForm.caracter,
        especie: specieDropdownValue,
        estado: stateDropdownValue,
        url_foto: newAnimalForm.url_foto ? [newAnimalForm.url_foto] : [],
        id_protectora: idProtectora,
      };
      await addAnimal(newAnimal);
      alert('Animal registrado');
      router.push('/');
    } catch (err) {
      alert('Error al guardar: ' + err.message);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleContainer}>
          <BackButton />
          <Text style={styles.title}>Detalles del animal</Text>
          <View style={styles.whiteButton}>
            <Text style={styles.whiteButtonText}>✕</Text>
          </View>
        </View>
        <View style={styles.tealBlock}>
          <Text style={styles.sectionTitle}>Nombre y foto</Text>
          <TextInput
            style={styles.inputFull}
            onChangeText={(v) => handleChange('nombre', v)}
            placeholder="Nombre del animal"
            placeholderTextColor="#878a8a"
          />
          <TextInput
            style={styles.inputFull}
            onChangeText={(v) => handleChange('url_foto', v)}
            placeholder="URL de la imagen"
            placeholderTextColor="#878a8a"
          />

          <Text style={styles.sectionTitle}>Sobre el animal</Text>
          <View style={styles.dataRow}>
            <View style={styles.inputCard}>
              <Text style={styles.inputCardLabel}>Género</Text>
              <TextInput
                style={styles.inputCardValue}
                onChangeText={(v) => handleChange('genero', v)}
              />
            </View>
            <View style={styles.inputCard}>
              <Text style={styles.inputCardLabel}>Edad</Text>
              <TextInput
                style={styles.inputCardValue}
                keyboardType="numeric"
                onChangeText={(v) => handleChange('edad', v)}
              />
            </View>
            <View style={styles.inputCard}>
              <Text style={styles.inputCardLabel}>Tamaño</Text>
              <TextInput
                style={styles.inputCardValue}
                onChangeText={(v) => handleChange('tamano', v)}
              />
            </View>
          </View>
          <View style={styles.dataRow}>
            <View style={styles.inputCard}>
              <Text style={styles.inputCardLabel}>Raza</Text>
              <TextInput
                style={styles.inputCardValue}
                onChangeText={(v) => handleChange('raza', v)}
              />
            </View>
            <View style={styles.inputCard}>
              <Text style={styles.inputCardLabel}>Carácter</Text>
              <TextInput
                style={styles.inputCardValue}
                onChangeText={(v) => handleChange('caracter', v)}
              />
            </View>
          </View>
          <TextInput
            style={styles.textArea}
            multiline
            onChangeText={(v) => handleChange('presentacion', v)}
            placeholder="Descripción del animal"
            placeholderTextColor="#878a8a"
            textAlignVertical="top"
          />

          <View style={styles.dropdownContainer}>
            <Dropdown
              style={styles.dropdown}
              containerStyle={styles.dropdownListContainer}
              data={SPECIES}
              placeholder={'Selecciona la especie...'}
              maxHeight={300}
              labelField="label"
              valueField="value"
              value={specieDropdownValue}
              onChange={(item) => {
                setSpecieDropdownValue(item.value);
              }}
            />
          </View>

          <Text style={styles.sectionTitle}>Estado</Text>
          <View style={styles.dropdownContainer}>
            <Dropdown
              style={styles.dropdown}
              containerStyle={styles.dropdownListContainer}
              data={STATES}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={'Selecciona el estado...'}
              value={stateDropdownValue}
              onChange={(item) => {
                setStateDropdownValue(item.value);
              }}
            />
          </View>
        </View>
        <View style={styles.bottomView} />
      </ScrollView>

      {/* Barra Guardar fija */}
      <Pressable
        style={[
          styles.saveBar,
          { paddingBottom: insets.bottom > 0 ? insets.bottom : scaleSize(16) },
        ]}
        onPress={handleSave}
      >
        <Image
          source={require('../../assets/icons/GuardarBtn.png')}
          style={styles.saveButtonImage}
          resizeMode="contain"
        />
      </Pressable>
    </View>
  );
}

const createStyles = (insets) =>
  StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: '#FFFFFF' },
    centeredContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
    },
    scrollContainer: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      alignSelf: 'center',
      width: '100%',
      maxWidth: 500,
    },
    scrollContent: { flexGrow: 1, paddingTop: insets.top, paddingBottom: 0 },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      paddingVertical: scaleSize(8),
    },
    title: {
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(20),
      flex: 1,
      textAlign: 'center',
    },
    whiteButton: {
      width: scaleSize(36),
      height: scaleSize(36),
      backgroundColor: '#FFFFFF',
      borderRadius: scaleSize(8),
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: scaleSize(10),
    },
    whiteButtonText: {
      color: '#FFFFFF',
      fontSize: scaleFont(14),
      fontWeight: 'bold',
    },
    tealBlock: {
      backgroundColor: '#3DBDB0',
      paddingHorizontal: scaleSize(15),
      paddingBottom: scaleSize(10),
    },
    sectionTitle: {
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(20),
      fontWeight: 'bold',
      paddingTop: scaleSize(20),
      paddingLeft: scaleSize(5),
      paddingBottom: scaleSize(8),
    },
    inputFull: {
      backgroundColor: '#e8f7f6',
      borderRadius: scaleSize(10),
      paddingHorizontal: scaleSize(15),
      paddingVertical: scaleSize(10),
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(16),
      color: '#000000',
      marginBottom: scaleSize(10),
    },
    dataRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: scaleSize(8),
      marginBottom: scaleSize(10),
    },
    inputCard: {
      backgroundColor: '#e8f7f6',
      borderRadius: scaleSize(10),
      flex: 1,
      paddingVertical: scaleSize(10),
      paddingHorizontal: scaleSize(15),
      marginBottom: scaleSize(10),
    },
    inputCardLabel: {
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(14),
      color: '#878a8a',
    },
    inputCardValue: {
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(16),
      color: '#000000',
    },
    textArea: {
      backgroundColor: '#e8f7f6',
      borderRadius: scaleSize(10),
      paddingHorizontal: scaleSize(15),
      paddingVertical: scaleSize(10),
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(16),
      color: '#000000',
      minHeight: scaleSize(120),
      marginBottom: scaleSize(10),
    },
    mapContainer: {
      borderRadius: scaleSize(10),
      overflow: 'hidden',
      height: scaleSize(150),
      marginBottom: scaleSize(4),
      backgroundColor: '#e8f7f6',
    },
    mapImage: { width: '100%', height: '100%' },
    mapButton: {
      position: 'absolute',
      bottom: scaleSize(10),
      right: scaleSize(10),
      backgroundColor: '#3DBDB0',
      borderRadius: scaleSize(20),
      width: scaleSize(36),
      height: scaleSize(36),
      alignItems: 'center',
      justifyContent: 'center',
    },
    mapButtonText: { fontSize: scaleFont(18) },
    docRow: {
      flexDirection: 'row',
      gap: scaleSize(12),
      marginTop: scaleSize(4),
      marginBottom: scaleSize(20),
    },
    docCard: {
      backgroundColor: '#e8f7f6',
      borderRadius: scaleSize(10),
      paddingVertical: scaleSize(10),
      paddingHorizontal: scaleSize(15),
      flex: 1,
      gap: scaleSize(4),
    },
    docLabel: {
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(14), // igual que DataCard category
      color: '#878a8a',
    },
    docFileName: {
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(16), // igual que DataCard data
      color: '#000000',
    },
    bottomView: {
      width: '100%',
      height: scaleSize(80),
      backgroundColor: '#3DBDB0',
    },
    saveBar: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingTop: scaleSize(10),
      paddingHorizontal: scaleSize(20),
      alignItems: 'center',
    },
    saveButtonImage: { width: '100%', height: scaleSize(55) },
    dropdown: {
      backgroundColor: '#FFFFFF', // Fondo blanco
      borderRadius: scaleSize(10),
      paddingHorizontal: scaleSize(15),
      paddingVertical: scaleSize(8),
      height: scaleSize(50),
    },
    dropdownListContainer: {
      borderRadius: scaleSize(10),
      backgroundColor: '#FFFFFF',
    },
    // Si quieres que el texto interno también use tu fuente:
    placeholderStyle: {
      fontSize: scaleFont(16),
      fontFamily: 'TiltNeon',
      color: '#878a8a',
    },
    selectedTextStyle: {
      fontSize: scaleFont(16),
      fontFamily: 'TiltNeon',
      color: '#000000',
    },
  });
