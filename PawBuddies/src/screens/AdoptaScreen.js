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
} from 'react-native';
import AnimalCard from '../components/AnimalCard';
import { Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase, getPublicUrl } from '../lib/supabase';

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

