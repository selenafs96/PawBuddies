import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scaleFont, scaleSize } from '../../../src/constants/layout.js';
import { AnimalImagesCarousel } from '../../../src/components/AnimalImagesCarousel.js';
import { DataCard } from '../../../src/components/DataCard.js';
import { BackButton } from '../../../src/components/BackButton.js';
import { useAdoptableAnimalDetails } from '../../../src/hooks/useAdoptableAnimalDetails.js';

export default function AdoptableAnimalDetail() {
  const insets = useSafeAreaInsets();
  const styles = createStyles(insets);

  const { adoptableAnimalDetails } = useAdoptableAnimalDetails({
    filter: 'id_animal',
    value: 'b51116cd-2bed-44c9-bca0-f2b5f95dd6cd',
  });

  console.log('DATA:', JSON.stringify(adoptableAnimalDetails));

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.titleContainer}>
          <BackButton />
          <Text style={styles.title}>Detalles del animal</Text>
        </View>
        <AnimalImagesCarousel
          filter="id_animal"
          value="b51116cd-2bed-44c9-bca0-f2b5f95dd6cd"
        />
        <Image
          source={require('../../../assets/icons/fav.png')}
          style={styles.favButton}
        />
        <View
          style={{
            backgroundColor: '#3DBDB0',
            paddingHorizontal: scaleSize(15),
          }}
        >
          <View style={{ width: '100%' }}>
            <Text style={styles.secondaryTitle}>
              {adoptableAnimalDetails.nombre}
            </Text>
          </View>
          <View style={styles.firstDataRow}>
            <DataCard category="Género" data={adoptableAnimalDetails.genero} />
            <DataCard
              category="Edad"
              data={adoptableAnimalDetails.edad}
              unidad_medida="años"
            />
            <DataCard
              category="Especie"
              data={adoptableAnimalDetails.especie}
            />
          </View>
          <View style={styles.secondDataRow}>
            <Text style={styles.secondaryTitle}>Presentación</Text>
            <DataCard
              category=""
              data={adoptableAnimalDetails.presentacion}
              style={styles.largeCard}
            />
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
            <DataCard
              category="Esterilizado"
              data={adoptableAnimalDetails.esterilizado}
              style={styles.wideCard}
            />
            <DataCard
              category="Raza"
              data={adoptableAnimalDetails.raza}
              style={styles.wideCard}
            />
            <DataCard
              category="Carácter"
              data={adoptableAnimalDetails.caracter}
              style={styles.tallWideCard}
            />
          </View>
        </View>
        <View style={styles.bottomView}></View>
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
}

const createStyles = (insets) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      width: '100%',
    },
    scrollContainer: {
      flex: 1,
      width: '100%',
      backgroundColor: '#FFFFFF',
      alignContent: 'center',
      alignSelf: 'center',
      maxWidth: 500,
    },
    scrollContent: {
      flexGrow: 1,
      paddingTop: insets.top,
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
      width: '70%',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(20),
      paddingTop: scaleSize(5),
      marginBottom: scaleSize(5),
    },
    firstDataRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
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
      gap: scaleSize(15),
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
      marginBottom: scaleSize(10),
    },
    tallWideCard: {
      marginLeft: scaleSize(10),
      marginRight: scaleSize(10),
      width: '95%',
      height: scaleSize(60),
      marginBottom: scaleSize(10),
      height: 'auto',
    },
    adoptameButton: {
      position: 'absolute',
      bottom: insets.bottom > 0 ? insets.bottom : scaleSize(10),
      alignSelf: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: scaleSize(20),
      paddingHorizontal: scaleSize(14),
      paddingVertical: scaleSize(5),
      width: '70%',
      height: scaleSize(43),
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontFamily: 'TiltNeon',
      color: '#3DBDB0',
      fontWeight: 'bold',
      fontSize: scaleFont(20),
    },
    bottomView: {
      width: '100%',
      height: scaleSize(50),
      backgroundColor: '#3DBDB0',
    },
    favButton: {
      position: 'absolute',
      width: scaleSize(35),
      height: scaleSize(35),
      left: scaleSize(320),
      top: scaleSize(45),
    },
  });
