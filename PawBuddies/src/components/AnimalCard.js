// components/AnimalCard.js
import { Link } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

export default function AnimalCard({ nombre, edad, imagen }) {
  const { width } = useWindowDimensions();
  const scale = width / 375; // 375 es el ancho base de referencia (iPhone 8)

  // Función para escalar tamaños
  const scaleFont = (size) => size * scale;
  const scaleSize = (size) => size * scale;

  const styles = StyleSheet.create({
    card: {
      backgroundColor: '#FFFFFF',
      borderRadius: scaleSize(12),
      overflow: 'hidden',
      flex: 1,
      margin: scaleSize(5),
    },
    imagen: {
      width: '100%',
      height: scaleSize(125),
      resizeMode: 'cover',
    },
    info: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: scaleSize(8),
    },
    nombre: {
      fontFamily: 'TiltNeon',
      fontWeight: '600',
      fontSize: scaleFont(14),
      color: '#222',
    },
    edad: {
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(12),
      color: '#888',
      marginTop: scaleSize(2),
    },
    boton: {
      backgroundColor: '#3DBDB0',
      borderRadius: scaleSize(20),
      paddingHorizontal: scaleSize(14),
      paddingVertical: scaleSize(5),
    },
    botonTexto: {
      fontFamily: 'TiltNeon',
      color: '#FFFFFF',
      fontSize: scaleFont(12),
      fontWeight: '600',
    },
  });

  return (
    <View style={styles.card}>
      <Image source={{ uri: imagen }} style={styles.imagen} />
      <View style={styles.info}>
        <View>
          <Text style={styles.nombre}>{nombre}</Text>
          <Text style={styles.edad}>{edad}</Text>
        </View>
        <Link href='/(animals)/detail'>
          <TouchableOpacity style={styles.boton}>
            <Text style={styles.botonTexto}>Ver</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
