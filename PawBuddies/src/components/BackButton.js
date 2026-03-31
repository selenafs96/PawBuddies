import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { scaleSize } from '../constants/layout';

export const BackButton = () => {
  return (
    <TouchableOpacity
      onPress={() => {
        alert('Adiós');
      }}
      style={styles.backButton}
    >
      <Image source={require('../../assets/icons/arrow_back.png')} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    backButton: {
      position: 'absolute',
      left: scaleSize(5),
      zIndex: 1,
      padding: scaleSize(10),
    },
  });
