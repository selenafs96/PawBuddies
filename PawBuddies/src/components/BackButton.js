import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { scaleSize } from '../constants/layout';
import { Link } from 'expo-router';

export const BackButton = () => {
  return (
    <Link href="/(animals)/list">
      <TouchableOpacity style={styles.backButton}>
        <Image source={require('../../assets/icons/arrow_back.png')} />
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  backButton: {
    zIndex: 1,
    padding: scaleSize(10),
  },
});
