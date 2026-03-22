import {
  View,
  FlatList,
  StyleSheet,
  Image,
  useWindowDimensions,
} from 'react-native';
import { useAnimalImages } from '../hooks/useAnimalImages.js';
import { useState } from 'react';

const AnimalImagesCarousel = ({ filter, value }) => {
  const { width: windowWidth } = useWindowDimensions();
  const { imageUrls } = useAnimalImages({ filter, value });

  //Para crear un índice para cada imagen
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleScroll = (event) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollOffset / windowWidth);
    setCurrentIndex(index);
  };

  const renderImage = ({ item }) => (
    <View style={[styles.imageContainer, { width: windowWidth }]}>
      <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
    </View>
  );

  return (
    <View style={styles.imageContainer}>
      <FlatList
        data={imageUrls}
        renderItem={renderImage}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ backgroundColor: '#3DBDB0' }}
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
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    overflow: 'hidden',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    height: 10,
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: 'white',
  },
  inactiveDot: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});

export default AnimalImagesCarousel;
