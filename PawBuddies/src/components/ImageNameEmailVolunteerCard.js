import { Image, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scaleSize } from '../constants/layout';

export default function ImageNameEmailVolunteerCard() {
  const insets = useSafeAreaInsets();
  const styles = createStyles(insets);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.row}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/perfil.jpg')}
            style={styles.image}
          />
        </View>
        <View>
            <Text style={styles.name}>Nombre Apellido Apellido</Text>
            <Text style={styles.email}>Correo</Text>
        </View>
      </View>
    </View>
  );
}

const AVATAR_SIZE = scaleSize(60);

const createStyles = (insets) =>
  StyleSheet.create({
    mainContainer: {
      width: '100%',
      paddingTop: scaleSize(20),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      gap: scaleSize(10)
    },
    imageContainer: {
      width: AVATAR_SIZE,
      height: AVATAR_SIZE,
      borderRadius: AVATAR_SIZE / 2,
      overflow: 'hidden'
    },
    image: {
      width: '100%',
      height: '100%',
    },
    name: {
        fontFamily: 'TiltNeon',
        fontSize: scaleSize(16)
    },
    email: {
        fontFamily: 'TiltNeon',
        fontSize: scaleSize(14),
        color: '#666666'
    }
  });
