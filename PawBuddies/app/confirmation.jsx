import { View, Image, StyleSheet, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';

import { scaleFont, scaleSize } from '../src/constants/layout.js';

export default function MensajeConfirmacionScreen() {

  //Pasamos el mensaje que queremos que se muestre como parámetro al llamar a la ruta
  const { message } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const styles = createStyles(insets);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.circle} />
      <Text style={styles.title}>PawBuddies</Text>
      <Image
        source={require('../assets/icons/logo_principal.png')}
        style={styles.logo}
      />
      <Image source={require('../assets/icons/casa_pata_turquesa.png')} />
      <Text style={styles.text}>{message || 'Confirmación general'}</Text>
      <Pressable
        style={styles.volverButton}
        onPress={() => {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.push('/');
          }
        }}
      >
        <Text style={styles.buttonText}>Volver</Text>
      </Pressable>
    </View>
  );
}

const createStyles = (insets) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    circle: {
      position: 'absolute',
      top: -220,
      width: scaleSize(449),
      height: scaleSize(449),
      borderRadius: scaleSize(450) / 2,
      backgroundColor: '#3DBDB0',
    },
    text: {
      marginTop: 10,
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(20),
    },
    title: {
      position: 'absolute',
      top: (insets.top || 20) + 130, // Se ajusta dinámicamente
      color: '#fff',
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(20),
    },
    volverButton: {
      position: 'absolute',
      bottom: insets.bottom > 0 ? insets.bottom : scaleSize(10),
      alignSelf: 'center',
      backgroundColor: '#3DBDB0',
      borderRadius: 10,
      paddingHorizontal: scaleSize(14),
      paddingVertical: scaleSize(5),
      width: '85%',
      height: scaleSize(43),
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: '#fff',
    },
    logo: {
      position: 'absolute',
      top: insets.top > 0 ? insets.top + 20 : scaleSize(40),
    },
  });
