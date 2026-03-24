import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnimalImagesCarousel } from '../components/AnimalImagesCarousel.js';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import { scaleFont, scaleSize } from '../constants/layout.js';
import { DataCard } from '../components/DataCard.js';

export const AdoptableAnimalDetail = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top,
        flex: 1,
        backgroundColor: '#3DBDB0',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Fondo general turquesa */}
      <View style={[styles.titleContainer, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => {}} style={styles.backButton}>
          <Image source={require('../../assets/icons/arrow-back.svg')}></Image>
        </TouchableOpacity>
        <Text style={styles.title}>Detalles del animal</Text>
      </View>
      <AnimalImagesCarousel filter="nombre" value="Luna" />
      <View style={{ width: '100%' }}>
        <Text style={styles.secondaryTitle}>Nombre</Text>
      </View>
      <View style={styles.firstDataRow}>
        <DataCard category="Género" data="Hembra" />
        <DataCard category="Edad" data="4" />
        <DataCard category="Carácter" data="Tranquilo" />
      </View>
      <View style={styles.secondDataRow}>
        <Text style={styles.secondaryTitle}>Presentación</Text>
        <DataCard
          category=""
          data="Muy bueno"
          style={styles.largeCard}
        />
      </View>
      <Pressable
        style={styles.adoptameButton}
        onPress={() => {
          alert('Hola');
        }}
      >
        <Text style={styles.buttonText}>Adóptame</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  secondaryTitle: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(20),
    fontWeight: 'bold',
    paddingTop: scaleSize(20),
    paddingLeft: scaleSize(20),
    paddingBottom: scaleSize(8),
  },
  titleContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(20),
    paddingTop: scaleSize(5),
    marginBottom: scaleSize(5),
  },
  firstDataRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#3DBDB0',
    marginBottom: scaleSize(20),
  },
  secondDataRow: {
    marginLeft: scaleSize(10),
    marginRight: scaleSize(10),
    backgroundColor: '#3DBDB0',
    width: '100%',
    alignItems: 'start',
  },
  largeCard: {
    marginLeft: scaleSize(10),
    marginRight: scaleSize(10),
    width: '95%',
    height: scaleSize(200),
  },
  backButton: {
    position: 'absolute',
    left: scaleSize(5),
    zIndex: 1,
    padding: scaleSize(10),
  },
  adoptameButton: {
    position: 'absolute',
    bottom: scaleSize(8),
    backgroundColor: '#FFFFFF',
    borderRadius: scaleSize(20),
    paddingHorizontal: scaleSize(14),
    paddingVertical: scaleSize(5),
    width: '60%',
    height: scaleSize(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'TiltNeon',
    color: '#3DBDB0',
    fontWeight: 'bold',
    fontSize: scaleFont(18),
  },
});
