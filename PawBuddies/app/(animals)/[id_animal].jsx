import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';

import { scaleFont, scaleSize } from '../../src/constants/layout.js';
import { AnimalImagesCarousel } from '../../src/components/AnimalImagesCarousel.js';
import { AnimalDataCard } from '../../src/components/AnimalDataCard.js';
import { useAnimals } from '../../src/hooks/useAnimals.js';
import { useShelter } from '../../src/hooks/useShelter.js';
import { useHealthRecord } from '../../src/hooks/useHealthRecord.js';
import ScreenHeader from '../../src/components/ScreenHeader.js';
import { supabase } from '../../src/lib/supabase.js';
import { useFavoritos } from '../../src/hooks/useFavoritos.js';
import { useAdopcion } from '../../src/hooks/useAdopcion.js';

export default function AdoptableAnimalDetail() {
  const [userId, setUserId] = useState(null);
  const [esFavorito, setEsFavorito] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setUserId(session.user.id);
      }
    };
    checkSession();
  }, []);

  const insets = useSafeAreaInsets();
  const styles = createStyles(insets);
  const { id_animal } = useLocalSearchParams();

  const { animals, loading, fetchAnimalById } = useAnimals();
  const { shelters, shelterLoading, fetchShelterById } = useShelter();
  const { healthRecords, healthRecordLoading, fetchHealthRecordById } =
    useHealthRecord();
  const {
    toggleFavorito,
    loading: favoritosLoading,
    checkEsFavorito,
  } = useFavoritos();
  const { enviarSolicitudAdopcion } = useAdopcion();

  //Usamos dos useEffect porque la función fetch es asíncrona, y el useEffect ejecuta todo a la vez, no de manera secuencial
  useEffect(() => {
    if (id_animal) {
      fetchAnimalById(id_animal);
    }
  }, [id_animal]);

  useEffect(() => {
    if (animals && animals.id_protectora) {
      fetchShelterById(animals.id_protectora);
    }

    if (animals && animals.id_animal) {
      fetchHealthRecordById(animals.id_animal);
    }
  }, [animals]);

  useEffect(() => {
    const checkFavorito = async () => {
      if (userId && id_animal) {
        const esFav = await checkEsFavorito(userId, id_animal);
        setEsFavorito(esFav);
      }
    };
    checkFavorito();
  }, [userId, id_animal]);

  const handleFavorito = async () => {
    if (!userId) {
      router.push('/login');
      return;
    }

    if (userId) {
      toggleFavorito(id_animal, userId);
      setEsFavorito(!esFavorito)
    }
  };

  const handleAdoptame = async () => {

    if(!userId) {
      router.push('/login');
      return;
    }
    await enviarSolicitudAdopcion(userId, id_animal);
    router.push({
      pathname: '/confirmation',
      params: { message: '¡Solicitud enviada!' },
    });
  };

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
        <ScreenHeader title="Detalles del animal" />
        <AnimalImagesCarousel imageUrls={animals.url_foto} />

        {!esFavorito ? (
          <TouchableOpacity style={styles.favButton} onPress={handleFavorito}>
            <Image source={require('../../assets/icons/fav.png')} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.favButton} onPress={handleFavorito}>
            <Image source={require('../../assets/icons/checkedFav.png')} />
          </TouchableOpacity>
        )}
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
            <AnimalDataCard category="Género" data={animals.genero} />
            <AnimalDataCard
              category="Edad"
              data={animals.edad}
              unidad_medida="años"
            />
            <AnimalDataCard category="Especie" data={animals.especie} />
          </View>
          <View style={styles.secondDataRow}>
            <Text style={styles.secondaryTitle}>Presentación</Text>
            <AnimalDataCard
              category=""
              data={animals.presentacion}
              style={styles.largeCard}
            />
          </View>
          <View style={{ width: '100%' }}>
            <Text style={styles.secondaryTitle}>Datos adicionales</Text>
          </View>
          <View style={styles.thirdDataSection}>
            <AnimalDataCard
              category="Protectora"
              data={shelters.nombre}
              style={styles.wideCard}
            />
            <AnimalDataCard
              category="Esterilizado"
              data={healthRecords.esterilizacion}
              style={styles.wideCard}
            />
            <AnimalDataCard
              category="Raza"
              data={animals.raza}
              style={styles.wideCard}
            />
            <AnimalDataCard
              category="Carácter"
              data={animals.caracter}
              style={styles.tallWideCard}
            />
          </View>
        </View>
        <View style={styles.bottomView}></View>
      </ScrollView>
      <TouchableOpacity onPress={handleAdoptame} style={styles.adoptameButton}>
        <Text style={styles.buttonText}>Adóptame</Text>
      </TouchableOpacity>
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
      alignItems: 'center',
      paddingTop: insets.top,
      width: '100%',
    },
    leftColumn: {
      flex: 1,
      alignItems: 'flex-start',
    },
    centerColumn: {
      flex: 2,
      alignItems: 'center',
    },
    rightColumn: {
      flex: 1,
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
      right: scaleSize(20),
      top: scaleSize(45),
      zIndex: 10,
    },
    informativeMessages: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
    },
  });
