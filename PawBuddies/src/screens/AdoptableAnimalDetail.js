import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AnimalImagesCarousel from '../components/AnimalImagesCarousel.js';
import { View, Text, StyleSheet } from 'react-native';
import { scaleFont } from '../constants/layout.js';
import { DataCard } from '../components/DataCard.js';

export const AdoptableAnimalDetail = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingBottom: insets.bottom, paddingTop: insets.top, flex: 1, backgroundColor: "#3DBDB0" }}>
      <AnimalImagesCarousel filter= 'nombre' value='Luna'/>
      <Text style = {styles.title}>Nombre</Text>
      <DataCard category="Nombre" data="Luna"></DataCard>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "TiltNeon",
    fontSize: scaleFont(20),
    fontWeight: "bold",
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 8,
  }
});
