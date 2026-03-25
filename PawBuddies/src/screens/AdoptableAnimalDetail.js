import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scaleFont, scaleSize } from '../constants/layout.js';
import { AnimalImagesCarousel } from '../components/AnimalImagesCarousel.js';
import { DataCard } from '../components/DataCard.js';

export const AdoptableAnimalDetail = () => {
  const insets = useSafeAreaInsets();
  const styles = createStyles(insets);

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        <View style={styles.titleContainer}>
          <TouchableOpacity onPress={() => {}} style={styles.backButton}>
            <Image
              source={require('../../assets/icons/arrow-back.svg')}
            ></Image>
          </TouchableOpacity>
          <Text style={styles.title}>Detalles del animal</Text>
        </View>
        <AnimalImagesCarousel filter="nombre" value="Luna" />
        <View style={{ width: '100%' }}>
          <Text style={styles.secondaryTitle}>Nombre</Text>
        </View>
        <View style={styles.firstDataRow}>
          <DataCard category="Género" data="Hembra" />
          <DataCard category="Edad" data="4" unidad_medida="años" />
          <DataCard category="Carácter" data="Tranquilo" />
        </View>
        <View style={styles.secondDataRow}>
          <Text style={styles.secondaryTitle}>Presentación</Text>
          <DataCard category="" data="Muy bueno" style={styles.largeCard} />
        </View>
        <View style={{ width: '100%' }}>
          <Text style={styles.secondaryTitle}>Datos adicionales</Text>
        </View>
        <View style={styles.thirdDataSection}>
          <DataCard
            category="Protectora"
            data="PawBuddies"
            style={styles.wideCard}
          />
          <DataCard category="Esterilizado" data="Sí" style={styles.wideCard} />
          <DataCard category="Especie" data="Perro" style={styles.wideCard} />
          <DataCard category="Raza" data="Labrador" style={styles.wideCard} />
        </View>
      </ScrollView>
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

const createStyles = (insets) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: '#3DBDB0',
      width: '100%',
    },
    scrollContainer: {
      paddingTop: insets.top,
      flex: 1,
      width: '100%',
      backgroundColor: '#3DBDB0',
      alignContent: 'center',
      alignSelf: 'center',
      maxWidth: 500,
    },
    scrollContent: {
      flexGrow: 1,
      paddingTop: insets.top,
      paddingBottom: insets.bottom + scaleSize(80),
    },
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
      backgroundColor: '#3DBDB0',
      width: '100%',
      alignItems: 'start',
    },
    thirdDataSection: {
      width: '100%',
      backgroundColor: '#3DBDB0',
      gap: scaleSize(15)
    },
    largeCard: {
      marginLeft: scaleSize(10),
      marginRight: scaleSize(10),
      width: '95%',
      height: scaleSize(200),
    },
    wideCard: {
      marginLeft: scaleSize(10),
      marginRight: scaleSize(10),
      width: '95%',
      height: scaleSize(60),
    },
    backButton: {
      position: 'absolute',
      left: scaleSize(5),
      zIndex: 1,
      padding: scaleSize(10),
    },
    adoptameButton: {
      position: 'absolute',
      bottom: insets.bottom > 0 ? insets.bottom : scaleSize(10),
      alignSelf: 'center',
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
