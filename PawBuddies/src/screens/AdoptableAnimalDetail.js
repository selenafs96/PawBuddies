import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnimalImagesCarousel } from '../components/AnimalImagesCarousel.js';
import { View, Text, StyleSheet } from 'react-native';
import { scaleFont } from '../constants/layout.js';
import { DataCard } from '../components/DataCard.js';

export const AdoptableAnimalDetail = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF', alignContent: 'center', alignItems: 'center' }}>
      {/* Fondo general blanco */}
      <View
        style={{
          paddingTop: insets.top, // El espacio de la barra
          backgroundColor: '#FFFFFF',
        }}
      />
        <Text style={styles.title}>Detalles del animal</Text>
      <AnimalImagesCarousel filter="nombre" value="Luna" />
      <View
        style={{
          paddingBottom: insets.bottom,
          width: '100%',
          height: '100%',
          backgroundColor: '#3DBDB0',
        }}
      >
        <Text style={styles.categoryTitle}>Nombre</Text>
        <DataCard category="Nombre" data="Luna"></DataCard>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryTitle: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(20),
    fontWeight: 'bold',
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 8,
  },
  topView: {
    width: '100%',
    height: 40,
    backgroundColor: '#FFFFFF',
    alignContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(20),
    paddingTop: 5,
  },
});
