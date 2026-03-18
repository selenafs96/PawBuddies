// screens/AdoptaScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  useWindowDimensions,
  Alert,
  Modal,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import AnimalCard from '../components/AnimalCard';
import { Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase, getPublicUrl, uploadFile } from '../lib/supabase';

// Datos de ejemplo para el modo "offline" / sin conexión.
// Cuando la app esté lista con Supabase, se reemplazará por datos reales.
const ejemploAnimales = [
  { id: '1', nombre: 'Luna', edad: '2 años', tipo: 'perro', imagen: 'https://placedog.net/400/300?id=1' },
  { id: '2', nombre: 'Misi', edad: '3 años', tipo: 'gato', imagen: 'https://placekitten.com/400/300' },
  { id: '3', nombre: 'Rocky', edad: '1 año', tipo: 'gato', imagen: 'https://placekitten.com/401/300' },
  { id: '4', nombre: 'Toby', edad: '4 años', tipo: 'perro', imagen: 'https://placedog.net/400/300?id=2' },
];

// Cambia este nombre por el bucket que uses en Supabase Storage.
const SUPABASE_BUCKET = 'animal-images';


export default function AdoptaScreen() {
  const { width } = useWindowDimensions();
  const scale = width / 375; // 375 es el ancho base de referencia (iPhone 8)

  // Función para escalar tamaños
  const scaleFont = (size) => size * scale;
  const scaleSize = (size) => size * scale;
  const NAV_HEIGHT = scaleSize(50);

  const [filtro, setFiltro] = useState('todos'); // 'todos' | 'perro' | 'gato'
  const [animales, setAnimales] = useState(ejemploAnimales);
  const [loading, setLoading] = useState(false);

  // Estados para agregar un nuevo animal
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoEdad, setNuevoEdad] = useState('');
  const [nuevoTipo, setNuevoTipo] = useState('perro');
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fetchAnimales = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('animals').select('*');

    if (error) {
      console.warn('Error al cargar animales desde Supabase:', error.message);
      setLoading(false);
      return;
    }

    const datosConImagen = data.map((item) => {
      const publicUrl =
        item.imagen ||
        (item.image_path
          ? getPublicUrl(SUPABASE_BUCKET, item.image_path)
          : undefined);

      return {
        id: item.id?.toString() ?? `${Math.random()}`,
        nombre: item.nombre,
        edad: item.edad,
        tipo: item.tipo,
        imagen: publicUrl,
      };
    });

    setAnimales(datosConImagen);
    setLoading(false);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Necesitamos permiso para acceder a tus fotos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (result.canceled) return;

    const uri = result.assets ? result.assets[0].uri : result.uri;
    setSelectedImageUri(uri);
  };

  const handleSaveAnimal = async () => {
    if (!nuevoNombre.trim() || !nuevoEdad.trim()) {
      Alert.alert('Faltan datos', 'Completa nombre y edad.');
      return;
    }

    if (!selectedImageUri) {
      Alert.alert('Sin imagen', 'Selecciona una imagen para la mascota.');
      return;
    }

    setUploading(true);

    try {
      const fileExt = selectedImageUri.split('.').pop();
      const fileName = `animal_${Date.now()}.${fileExt}`;
      const filePath = `animals/${fileName}`;

      await uploadFile(SUPABASE_BUCKET, filePath, selectedImageUri);

      const { error } = await supabase.from('animals').insert([
        {
          nombre: nuevoNombre,
          edad: nuevoEdad,
          tipo: nuevoTipo,
          image_path: filePath,
        },
      ]);

      if (error) {
        throw error;
      }

      // Refrescar lista
      await fetchAnimales();

      setModalVisible(false);
      setNuevoNombre('');
      setNuevoEdad('');
      setNuevoTipo('perro');
      setSelectedImageUri(null);
    } catch (error) {
      console.warn('Error guardando animal:', error);
      Alert.alert('Error', 'No se pudo guardar la mascota.');
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchAnimales();
  }, []);

  const animalesFiltrados = animales.filter((a) =>
    filtro === 'todos' ? true : a.tipo === filtro
  );

  // FlatList necesita pares para la grid de 2 columnas
  const renderItem = ({ item }) => (
    <AnimalCard
      nombre={item.nombre}
      edad={item.edad}
      imagen={item.imagen}
    />
  );

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    titulo: {
      color: '#222222',
      fontSize: scaleFont(20),
      fontWeight: '600',
      textAlign: 'center',
      paddingVertical: scaleSize(14),
      backgroundColor: '#FFFFFF',
    },
    container: {
      flex: 1,
      backgroundColor: '#3DBDB0',
      paddingHorizontal: scaleSize(25),
      paddingTop: scaleSize(12),
      paddingBottom: NAV_HEIGHT,
    },
    filtrosRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: scaleSize(8),
      position: 'relative',
    },
    filtrosBotones: {
      flexDirection: 'row',
      gap: scaleSize(8),
    },
    filtroBtnIcono: {
      backgroundColor: '#FFFFFF',
      borderRadius: scaleSize(10),
      width: scaleSize(42),
      height: scaleSize(42),
      alignItems: 'center',
      justifyContent: 'center',
    },
    filtroActivo: {
      backgroundColor: '#3DBDB0',
    },
    filtroSlider: {
      position: 'absolute',
      right: 0,
    },
    filtroIconoImg: {
      width: scaleSize(24),
      height: scaleSize(24),
      resizeMode: 'contain',
      tintColor: '#3DBDB0',
    },
    navIconoImg: {
      width: scaleSize(24),
      height: scaleSize(24),
      resizeMode: 'contain',
      tintColor: '#FFFFFF',
    },
    grid: {
      paddingBottom: scaleSize(16),
    },
    addButton: {
      backgroundColor: '#FFFFFF',
      paddingVertical: scaleSize(10),
      paddingHorizontal: scaleSize(12),
      borderRadius: scaleSize(12),
      alignItems: 'center',
      marginBottom: scaleSize(12),
    },
    addButtonText: {
      fontSize: scaleFont(14),
      fontWeight: '600',
      color: '#3DBDB0',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.35)',
      justifyContent: 'center',
      padding: scaleSize(20),
    },
    modalContent: {
      backgroundColor: '#FFFFFF',
      borderRadius: scaleSize(16),
      padding: scaleSize(20),
    },
    modalTitle: {
      fontSize: scaleFont(18),
      fontWeight: '700',
      marginBottom: scaleSize(16),
      textAlign: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: '#E5E5E5',
      borderRadius: scaleSize(12),
      paddingHorizontal: scaleSize(12),
      paddingVertical: scaleSize(10),
      marginBottom: scaleSize(10),
      fontSize: scaleFont(14),
    },
    tipoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: scaleSize(12),
    },
    tipoBtn: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#3DBDB0',
      borderRadius: scaleSize(12),
      paddingVertical: scaleSize(10),
      alignItems: 'center',
      marginHorizontal: scaleSize(4),
    },
    tipoBtnActive: {
      backgroundColor: '#3DBDB0',
    },
    tipoBtnText: {
      color: '#3DBDB0',
      fontWeight: '600',
      fontSize: scaleFont(14),
    },
    tipoBtnTextActive: {
      color: '#FFFFFF',
      fontWeight: '600',
      fontSize: scaleFont(14),
    },
    pickImageBtn: {
      backgroundColor: '#3DBDB0',
      borderRadius: scaleSize(12),
      paddingVertical: scaleSize(10),
      alignItems: 'center',
      marginBottom: scaleSize(10),
    },
    pickImageBtnText: {
      color: '#FFFFFF',
      fontSize: scaleFont(14),
      fontWeight: '600',
    },
    previewImage: {
      width: '100%',
      height: scaleSize(150),
      borderRadius: scaleSize(12),
      marginBottom: scaleSize(12),
    },
    modalActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    modalBtn: {
      flex: 1,
      paddingVertical: scaleSize(10),
      borderRadius: scaleSize(12),
      alignItems: 'center',
      justifyContent: 'center',
    },
    cancelBtn: {
      backgroundColor: '#F0F0F0',
      marginRight: scaleSize(8),
    },
    saveBtn: {
      backgroundColor: '#3DBDB0',
    },
    modalBtnText: {
      fontSize: scaleFont(14),
      fontWeight: '600',
    },
    saveBtnText: {
      color: '#FFFFFF',
    },
    bottomNav: {
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      borderRadius: scaleSize(30),
      position: 'absolute',
      bottom: scaleSize(12),
      left: scaleSize(12),
      right: scaleSize(12),
      paddingVertical: scaleSize(10),
      paddingHorizontal: scaleSize(30),
      justifyContent: 'space-around',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: scaleSize(-2) },
      shadowOpacity: 0.08,
      shadowRadius: scaleSize(8),
      elevation: 8,
    },
    navItem: {
      padding: scaleSize(12),
      borderRadius: scaleSize(20),
      alignItems: 'center',
      justifyContent: 'center',
    },
    navActivo: {
      backgroundColor: '#3DBDB0',
      borderRadius: scaleSize(50),
      width: scaleSize(50),
      height: scaleSize(50),
    },
    bottomIconoImg: {
      width: scaleSize(24),
      height: scaleSize(24),
      resizeMode: 'contain',
    },
    bottomIconoImgActivo: {
      width: scaleSize(24),
      height: scaleSize(24),
      resizeMode: 'contain',
      tintColor: '#FFFFFF',
    },
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <SafeAreaView style={styles.safeArea}>

        {/* HEADER BLANCO */}
        <Text style={styles.titulo}>Adopta</Text>

        {/* AREA TURQUESA */}
        <View style={styles.container}>

          {/* FILTROS */}
          <View style={styles.filtrosRow}>
            <View style={styles.filtrosBotones}>
              <TouchableOpacity
                style={[styles.filtroBtnIcono, filtro === 'perro' && styles.filtroActivo]}
                onPress={() => setFiltro(filtro === 'perro' ? 'todos' : 'perro')}
              >
                <Image source={require('../../assets/icons/Dog.png')} style={styles.filtroIconoImg} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filtroBtnIcono, filtro === 'gato' && styles.filtroActivo]}
                onPress={() => setFiltro(filtro === 'gato' ? 'todos' : 'gato')}
              >
                <Image source={require('../../assets/icons/Cat.png')} style={styles.filtroIconoImg} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.filtroSlider}>
              <Image source={require('../../assets/icons/filter_list.png')} style={styles.navIconoImg} />
            </TouchableOpacity>
          </View>

          {/* BOTÓN AGREGAR ANIMAL */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addButtonText}>+ Agregar mascota</Text>
          </TouchableOpacity>

          {/* GRID DE ANIMALES */}
          <FlatList
            data={animalesFiltrados}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.grid}
            ListFooterComponent={<View style={{ height: scaleSize(16) }} />}
          />

          {/* MODAL AGREGAR ANIMAL */}
          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Agregar mascota</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Nombre"
                  value={nuevoNombre}
                  onChangeText={setNuevoNombre}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Edad"
                  value={nuevoEdad}
                  onChangeText={setNuevoEdad}
                />

                <View style={styles.tipoRow}>
                  <TouchableOpacity
                    style={[
                      styles.tipoBtn,
                      nuevoTipo === 'perro' && styles.tipoBtnActive,
                    ]}
                    onPress={() => setNuevoTipo('perro')}
                  >
                    <Text
                      style={
                        nuevoTipo === 'perro'
                          ? styles.tipoBtnTextActive
                          : styles.tipoBtnText
                      }
                    >
                      Perro
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.tipoBtn,
                      nuevoTipo === 'gato' && styles.tipoBtnActive,
                    ]}
                    onPress={() => setNuevoTipo('gato')}
                  >
                    <Text
                      style={
                        nuevoTipo === 'gato'
                          ? styles.tipoBtnTextActive
                          : styles.tipoBtnText
                      }
                    >
                      Gato
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.pickImageBtn}
                  onPress={pickImage}
                >
                  <Text style={styles.pickImageBtnText}>
                    {selectedImageUri ? 'Cambiar imagen' : 'Seleccionar imagen'}
                  </Text>
                </TouchableOpacity>

                {selectedImageUri ? (
                  <Image
                    source={{ uri: selectedImageUri }}
                    style={styles.previewImage}
                  />
                ) : null}

                {uploading ? (
                  <ActivityIndicator size="small" color="#3DBDB0" />
                ) : (
                  <View style={styles.modalActions}>
                    <TouchableOpacity
                      style={[styles.modalBtn, styles.cancelBtn]}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={styles.modalBtnText}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.modalBtn, styles.saveBtn]}
                      onPress={handleSaveAnimal}
                    >
                      <Text style={[styles.modalBtnText, styles.saveBtnText]}>
                        Guardar
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </Modal>

        </View>
      </SafeAreaView>

      {/* BOTTOM NAVIGATION */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Image source={require('../../assets/icons/home.png')} style={styles.bottomIconoImg} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.navActivo]}>
          <Image source={require('../../assets/icons/patas.png')} style={styles.bottomIconoImgActivo} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Image source={require('../../assets/icons/corazon.png')} style={styles.bottomIconoImg} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Image source={require('../../assets/icons/perfil.png')} style={styles.bottomIconoImg} />
        </TouchableOpacity>
      </View>

    </View>
  );
};

