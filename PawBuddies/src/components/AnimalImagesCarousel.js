import {
  View,
  FlatList,
  StyleSheet,
  Image,
  useWindowDimensions,
} from 'react-native';
import { useAnimalImages } from '../hooks/useAnimalImages.js';
import { useState } from 'react';

export const AnimalImagesCarousel = ({ filter, value }) => {
  const { width: windowWidth } = useWindowDimensions();
  const { imageUrls } = useAnimalImages({ filter, value });

  //Para crear un índice para cada imagen
  const [currentIndex, setCurrentIndex] = useState(0);

  const MARGIN = 20;
  const CAROUSEL_WIDTH = windowWidth - (MARGIN * 2);

  const handleScroll = (event) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollOffset / windowWidth);
    setCurrentIndex(index);
  };

  const renderImage = ({ item }) => (
    <View style={ { width: windowWidth }}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
      </View>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={imageUrls}
        renderItem={renderImage}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{ height: (windowWidth * 9) / 16 }}
      />
      {imageUrls.length > 1 && (
        <View style={styles.pagination}>
          {imageUrls.map((_, index) => (
            <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
            />
          ))}
        </View>
      )}
      </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1
  },
  mainContainer: {
    width: '100%',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: 'white',
  },
  inactiveDot: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    aspectRatio: 16/9,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white'
  }
});
