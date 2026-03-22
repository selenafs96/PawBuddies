import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AnimalImagesCarousel from '../components/AnimalImagesCarousel.js';
import { View } from 'react-native';

export const AdoptableAnimalDetail = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingBottom: insets.bottom, paddingTop: insets.top, flex: 1 }}>
      <AnimalImagesCarousel filter= 'nombre' value='Luna'/>
    </View>
  );
};
