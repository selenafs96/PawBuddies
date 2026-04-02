import { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

import { scaleFont, scaleSize } from '../../src/constants/layout.js';
import { AnimalImagesCarousel } from '../../src/components/AnimalImagesCarousel.js';
import { DataCard } from '../../src/components/DataCard.js';
import { BackButton } from '../../src/components/BackButton.js';
import { useAnimals } from '../../src/hooks/useAnimals.js';
import { useShelter } from '../../src/hooks/useShelter.js';
import { useHealthRecord } from '../../src/hooks/useHealthRecord.js';

export default function AdoptableAnimalDetail() {
  const insets = useSafeAreaInsets();
  const styles = createStyles(insets);
  const { id_animal } = useLocalSearchParams();

  const { animals, loading, fetchAnimalById } = useAnimals();
  const { shelters, shelterLoading, fetchShelterById } =
    useShelter();
  const {
    healthRecords,
    healthRecordLoading,
    fetchHealthRecordById,
  } = useHealthRecord();

  //Usamos dos useEffect porque la función fetch es asíncrona, y el useEffect ejecuta todo a la vez, no de manera secuencial
  useEffect(() => {
    if (id_animal) {
      fetchAnimalById(id_animal);
    }
  }, [id_animal]);

  console.log(animals);

  useEffect(() => {
    if (animals && animals.id_protectora) {
      fetchShelterById(animals.id_protectora);
    }

    if (animals && animals.id_animal) {
      fetchHealthRecordById(animals.id_animal);
    }
  }, [animals]);

  if (loading || healthRecordLoading || shelterLoading)
    return <Text style={styles.informativeMessages}>Cargando...</Text>;
  if (!animals || !shelters || !healthRecords)
    return <Text style={styles.informativeMessages}>No encontrado</Text>;

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
        <AnimalImagesCarousel imageUrls={animals.url_foto} />
        <Image
          source={require('../../assets/icons/fav.png')}
          style={styles.favButton}
        />
        <View
          style={{
            backgroundColor: '#3DBDB0',
            paddingHorizontal: scaleSize(15),
          }}
        >
          <View style={{ width: '100%' }}>
            <Text style={styles.secondaryTitle}>{animals.nombre}</Text>
          </View>
          <View style={styles.firstDataRow}>
            <DataCard category="Género" data={animals.genero} />
            <DataCard
              category="Edad"
              data={animals.edad}
              unidad_medida="años"
            />
            <DataCard category="Especie" data={animals.especie} />
          </View>
          <View style={styles.secondDataRow}>
            <Text style={styles.secondaryTitle}>Presentación</Text>
            <DataCard
              category=""
              data={animals.presentacion}
              style={styles.largeCard}
            />
          </View>
          <View style={{ width: '100%' }}>
            <Text style={styles.secondaryTitle}>Datos adicionales</Text>
          </View>
          <View style={styles.thirdDataSection}>
            <DataCard
              category="Protectora"
              data={shelters.nombre}
              style={styles.wideCard}
            />
            <DataCard
              category="Esterilizado"
              data={healthRecords.esterilizacion}
              style={styles.wideCard}
            />
            <DataCard
              category="Raza"
              data={animals.raza}
              style={styles.wideCard}
            />
            <DataCard
              category="Carácter"
              data={animals.caracter}
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
    informativeMessages: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
    },
  });
