import {
  View,
  FlatList,
  StyleSheet,
  Image,
  useWindowDimensions,
} from 'react-native';
import { useState } from 'react';
import { scaleSize } from '../constants/layout.js';

export const AnimalImagesCarousel = ({ imageUrls = [] }) => {
  const { width: windowWidth } = useWindowDimensions();
  const carouselHeight = (windowWidth * 9) / 16

  //Para crear un índice para cada imagen
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollOffset / windowWidth);
    setCurrentIndex(index);
  };

  const renderImage = ({ item }) => (
    <View style={ { width: windowWidth, backgroundColor: '#3DBDB0', height: carouselHeight }}>
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
    backgroundColor: '#FFFFFF'
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: scaleSize(10),
    alignSelf: 'center',
  },
  dot: {
    width: scaleSize(6),
    height: scaleSize(6),
    borderRadius: scaleSize(4),
    marginHorizontal: scaleSize(4),
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
    borderBottomStartRadius: scaleSize(10),
    borderBottomEndRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF'
  }
});