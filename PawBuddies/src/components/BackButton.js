import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { scaleSize } from '../constants/layout';
import { useRouter } from 'expo-router';

export const BackButton = () => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => {
        if (router.canGoBack()) {
          router.back();
        } else {
          router.push('/');
        }
      }}
    >
      <Image
        source={require('../../assets/icons/arrow_back.png')}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    zIndex: 1,
    padding: scaleSize(10),
  },
  icon: {
    width: scaleSize(20),
    height: scaleSize(20),
    resizeMode: 'contain',
  },
});
