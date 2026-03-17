// screens/AdoptaScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import AnimalCard from '../components/AnimalCard';

const animales = [
  { id: '1', nombre: 'Luna',  edad: '2 años',   tipo: 'perro', imagen: 'https://placedog.net/400/300?id=1' },
  { id: '2', nombre: 'Misi',  edad: '3 años',   tipo: 'gato',  imagen: 'https://placekitten.com/400/300'   },
  { id: '3', nombre: 'Rocky', edad: '1 año',    tipo: 'gato',  imagen: 'https://placekitten.com/401/300'   },
  { id: '4', nombre: 'Toby',  edad: '4 años',   tipo: 'perro', imagen: 'https://placedog.net/400/300?id=2' },
  { id: '5', nombre: 'Bono',  edad: '5 años',   tipo: 'perro', imagen: 'https://placedog.net/400/300?id=3' },
  { id: '6', nombre: 'Nala',  edad: '2 años',   tipo: 'gato',  imagen: 'https://placekitten.com/402/300'   },
  { id: '7', nombre: 'Max',   edad: '6 meses',  tipo: 'gato',  imagen: 'https://placekitten.com/403/300'   },
  { id: '8', nombre: 'Cleo',  edad: '3 años',   tipo: 'perro', imagen: 'https://placedog.net/400/300?id=4' },
];

export default function AdoptaScreen() {
  const [filtro, setFiltro] = useState('todos'); // 'todos' | 'perro' | 'gato'

  const animalesFiltrados = animales.filter(a =>
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* HEADER */}
        <Text style={styles.titulo}>Adopta</Text>

        {/* FILTROS */}
        <View style={styles.filtrosRow}>
          <View style={styles.filtrosBotones}>
            <TouchableOpacity
              style={[styles.filtroBtnIcono, filtro === 'perro' && styles.filtroActivo]}
              onPress={() => setFiltro(filtro === 'perro' ? 'todos' : 'perro')}
            >
              <Text style={styles.filtroIcono}>🐶</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filtroBtnIcono, filtro === 'gato' && styles.filtroActivo]}
              onPress={() => setFiltro(filtro === 'gato' ? 'todos' : 'gato')}
            >
              <Text style={styles.filtroIcono}>🐱</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.filtroSlider}>
            <Text style={styles.filtroIcono}>☰</Text>
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
        />

      </View>

      {/* BOTTOM NAVIGATION */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcono}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.navActivo]}>
          <Text style={styles.navIcono}>🐾</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcono}>🤲</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcono}>👤</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#3DBDB0',
  },
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },

  // Header
  titulo: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 14,
  },

  // Filtros
  filtrosRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  filtrosBotones: {
    flexDirection: 'row',
    gap: 8,
  },
  filtroBtnIcono: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 10,
    padding: 8,
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filtroActivo: {
    backgroundColor: '#FFFFFF',
  },
  filtroSlider: {
    padding: 8,
  },
  filtroIcono: {
    fontSize: 18,
  },

  // Grid
  grid: {
    paddingBottom: 12,
  },

  // Bottom nav
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    margin: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
    // Sombra iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    // Sombra Android
    elevation: 8,
  },
  navItem: {
    padding: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navActivo: {
    backgroundColor: '#F0FAF9',
  },
  navIcono: {
    fontSize: 22,
  },
});