// screens/AdoptaScreen.js
import { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AnimalCard from '../../../src/components/AnimalCard';
import { useAnimales } from '../../../src/hooks/useAnimales';

export default function AdoptaScreen() {
  const { width } = useWindowDimensions();
  const scale = width / 375;
  const scaleFont = (size) => size * scale;
  const scaleSize = (size) => size * scale;
  const NAV_HEIGHT = scaleSize(50);

  const [filtro, setFiltro] = useState('todos');
  const { animales, loading, error } = useAnimales(filtro);

  // Mapea cada animal a las props que espera AnimalCard
  const renderItem = ({ item }) => (
    <AnimalCard
      nombre={item.nombre}
      edad={item.edad ? `${item.edad} años` : 'Edad desconocida'}
      imagen={item.url_foto?.[0] ?? null}  // primera foto del array, o null
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
    filtrosCenter: { flexDirection: 'row', gap: scaleSize(10), justifyContent: 'center' },
    filtroBtn: {
      backgroundColor: '#FFFFFF',
      padding: scaleSize(10),
      borderRadius: scaleSize(14),
      alignItems: 'center',
      justifyContent: 'center',
    },
    filtroTodosBtn: {
      position: 'absolute', right: 0,
      padding: scaleSize(10), alignItems: 'center', justifyContent: 'center',
    },
    filtroActivo: { backgroundColor: '#2A9A7D' },
    filtroIcono: { width: scaleSize(24), height: scaleSize(24), resizeMode: 'contain', tintColor: '#3DBDB0' },
    filtroIconoActivo: { tintColor: '#FFFFFF' },
    centrado: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    errorTexto: { fontFamily: 'TiltNeon', color: '#FFFFFF', fontSize: scaleFont(14), textAlign: 'center' },
    bottomNav: {
      flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: scaleSize(50),
      position: 'absolute', bottom: scaleSize(6), left: scaleSize(70), right: scaleSize(70),
      height: scaleSize(50), paddingVertical: scaleSize(6), paddingHorizontal: scaleSize(16),
      justifyContent: 'space-around', alignItems: 'center',
      shadowColor: '#000', shadowOffset: { width: 0, height: scaleSize(-1) },
      shadowOpacity: 0.06, shadowRadius: scaleSize(5), elevation: 4,
    },
    navItem: { padding: scaleSize(6), borderRadius: scaleSize(14), alignItems: 'center', justifyContent: 'center' },
    navActivo: { backgroundColor: '#3DBDB0', borderRadius: scaleSize(34), width: scaleSize(34), height: scaleSize(34) },
    bottomIconoImg: { width: scaleSize(18), height: scaleSize(18), resizeMode: 'contain' },
    bottomIconoImgActivo: { width: scaleSize(18), height: scaleSize(18), resizeMode: 'contain', tintColor: '#FFFFFF' },
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
                style={[styles.filtroBtn, filtro === 'perro' && styles.filtroActivo]}
                onPress={() => setFiltro(filtro === 'perro' ? 'todos' : 'perro')}
              >
                <Image
                  source={require('../../../assets/icons/Dog.png')}
                  style={[styles.filtroIcono, filtro === 'perro' && styles.filtroIconoActivo]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filtroBtn, filtro === 'gato' && styles.filtroActivo]}
                onPress={() => setFiltro(filtro === 'gato' ? 'todos' : 'gato')}
              >
                <Image
                  source={require('../../../assets/icons/Cat.png')}
                  style={[styles.filtroIcono, filtro === 'gato' && styles.filtroIconoActivo]}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.filtroTodosBtn} onPress={() => setFiltro('todos')}>
              <Image
                source={require('../../../assets/icons/filter_list.png')}
                style={[styles.filtroIcono, filtro === 'todos' && styles.filtroIconoActivo]}
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
              <Text style={styles.errorTexto}>Error al cargar animales:{'\n'}{error}</Text>
            </View>
          ) : (
            <FlatList
              data={animales}
              renderItem={renderItem}
              keyExtractor={(item) => item.id_animal}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: scaleSize(16) }}
              ListEmptyComponent={
                <View style={styles.centrado}>
                  <Text style={styles.errorTexto}>No hay animales disponibles</Text>
                </View>
              }
            />
          )}
        </View>
      </SafeAreaView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Image source={require('../../../assets/icons/home.png')} style={styles.bottomIconoImg} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.navActivo]}>
          <Image source={require('../../../assets/icons/patas.png')} style={styles.bottomIconoImgActivo} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Image source={require('../../../assets/icons/corazon.png')} style={styles.bottomIconoImg} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Image source={require('../../../assets/icons/perfil.png')} style={styles.bottomIconoImg} />
        </TouchableOpacity>
      </View>
    </View>
  );
}