// components/AnimalCard.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function AnimalCard({ nombre, edad, imagen }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imagen }} style={styles.imagen} />
      <View style={styles.info}>
        <View>
          <Text style={styles.nombre}>{nombre}</Text>
          <Text style={styles.edad}>{edad}</Text>
        </View>
        <TouchableOpacity style={styles.boton}>
          <Text style={styles.botonTexto}>Ver</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    flex: 1,
    margin: 6,
  },
  imagen: {
    width: '100%',
    height: 130,
    resizeMode: 'cover',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  nombre: {
    fontWeight: '600',
    fontSize: 14,
    color: '#222',
  },
  edad: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  boton: {
    backgroundColor: '#3DBDB0',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
  },
  botonTexto: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});