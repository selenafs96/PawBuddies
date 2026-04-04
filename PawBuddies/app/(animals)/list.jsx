// screens/AdoptaScreen.js
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AnimalCard from '../../src/components/AnimalCard';
import { useAnimals } from '../../src/hooks/useAnimals';
import { scaleFont, scaleSize } from '../../src/constants/layout';

export default function AdoptaScreen() {
  const NAV_HEIGHT = scaleSize(50);

  const [especie, setEspecie] = useState('todos');
  const [estado, setEstado] = useState('todos')
  const { animals, loading, error, fetchAnimalByEspecieEstado } = useAnimals();

  useEffect(() => {
    fetchAnimalByEspecieEstado(especie, 'Adoptable');
  }, [estado, especie]);


  // Mapea cada animal a las props que espera AnimalCard
  const renderItem = ({ item }) => (
    <AnimalCard
      id_animal={item.id_animal}
      nombre={item.nombre}
      edad={item.edad ? `${item.edad} años` : 'Edad desconocida'}
      imagen={item.url_foto?.[0] ?? null} // primera foto del array, o null
    />
  );

  const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
    titulo: {
      fontFamily: 'TiltNeon',
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
      borderTopLeftRadius: scaleSize(14),
      borderTopRightRadius: scaleSize(14),
      paddingHorizontal: scaleSize(25),
      paddingTop: scaleSize(12),
      paddingBottom: NAV_HEIGHT,
    },
    filtrosRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: scaleSize(12),
      position: 'relative',
    },
    filtrosCenter: {
      flexDirection: 'row',
      gap: scaleSize(10),
      justifyContent: 'center',
    },
    filtroBtn: {
      backgroundColor: '#FFFFFF',
      padding: scaleSize(10),
      borderRadius: scaleSize(14),
      alignItems: 'center',
      justifyContent: 'center',
    },
    filtroTodosBtn: {
      position: 'absolute',
      right: 0,
      padding: scaleSize(10),
      alignItems: 'center',
      justifyContent: 'center',
    },
    filtroActivo: { backgroundColor: '#2A9A7D' },
    filtroIcono: {
      width: scaleSize(24),
      height: scaleSize(24),
      resizeMode: 'contain',
      tintColor: '#3DBDB0',
    },
    filtroIconoActivo: { tintColor: '#FFFFFF' },
    centrado: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    errorTexto: {
      fontFamily: 'TiltNeon',
      color: '#FFFFFF',
      fontSize: scaleFont(14),
      textAlign: 'center',
    },
    bottomNav: {
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      borderRadius: scaleSize(50),
      position: 'absolute',
      bottom: scaleSize(6),
      left: scaleSize(70),
      right: scaleSize(70),
      height: scaleSize(50),
      paddingVertical: scaleSize(6),
      paddingHorizontal: scaleSize(16),
      justifyContent: 'space-around',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: scaleSize(-1) },
      shadowOpacity: 0.06,
      shadowRadius: scaleSize(5),
      elevation: 4,
    },
    navItem: {
      padding: scaleSize(6),
      borderRadius: scaleSize(14),
      alignItems: 'center',
      justifyContent: 'center',
    },
    navActivo: {
      backgroundColor: '#3DBDB0',
      borderRadius: scaleSize(34),
      width: scaleSize(34),
      height: scaleSize(34),
    },
    bottomIconoImg: {
      width: scaleSize(18),
      height: scaleSize(18),
      resizeMode: 'contain',
    },
    bottomIconoImgActivo: {
      width: scaleSize(18),
      height: scaleSize(18),
      resizeMode: 'contain',
      tintColor: '#FFFFFF',
    },
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.titulo}>Adopta</Text>

        <View style={styles.container}>
          {/* Filtros */}
          <View style={styles.filtrosRow}>
            <View style={styles.filtrosCenter}>
              <TouchableOpacity
                style={[
                  styles.filtroBtn,
                  especie === 'Perro' && styles.filtroActivo,
                ]}
                onPress={() =>
                  setEspecie(especie === 'Perro' ? 'todos' : 'Perro')
                }
              >
                <Image
                  source={require('../../assets/icons/Dog.png')}
                  style={[
                    styles.filtroIcono,
                    especie === 'Perro' && styles.filtroIconoActivo,
                  ]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filtroBtn,
                  especie === 'Gato' && styles.filtroActivo,
                ]}
                onPress={() => setEspecie(especie === 'Gato' ? 'todos' : 'Gato')}
              >
                <Image
                  source={require('../../assets/icons/Cat.png')}
                  style={[
                    styles.filtroIcono,
                    especie === 'Gato' && styles.filtroIconoActivo,
                  ]}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.filtroTodosBtn}
              onPress={() => setEspecie('todos')}
            >
              <Image
                source={require('../../assets/icons/filter_list.png')}
                style={[
                  styles.filtroIcono,
                  especie === 'todos' && styles.filtroIconoActivo,
                ]}
              />
            </TouchableOpacity>
          </View>

          {/* Contenido */}
          {loading ? (
            <View style={styles.centrado}>
              <ActivityIndicator size="large" color="#FFFFFF" />
            </View>
          ) : error ? (
            <View style={styles.centrado}>
              <Text style={styles.errorTexto}>
                Error al cargar animales:{'\n'}
                {error}
              </Text>
            </View>
          ) : (
            <FlatList
              data={animals}
              renderItem={renderItem}
              keyExtractor={(item) => item.id_animal}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: scaleSize(16) }}
              ListEmptyComponent={
                <View style={styles.centrado}>
                  <Text style={styles.errorTexto}>
                    No hay animales disponibles
                  </Text>
                </View>
              }
            />
          )}
        </View>
      </SafeAreaView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Image
            source={require('../../assets/icons/home.png')}
            style={styles.bottomIconoImg}
          />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.navActivo]}>
          <Image
            source={require('../../assets/icons/patas.png')}
            style={styles.bottomIconoImgActivo}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Image
            source={require('../../assets/icons/corazon.png')}
            style={styles.bottomIconoImg}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Image
            source={require('../../assets/icons/perfil.png')}
            style={styles.bottomIconoImg}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
