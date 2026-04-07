import { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { scaleFont, scaleSize } from '../constants/layout.js';
import { AnimalImagesCarousel } from '../components/AnimalImagesCarousel.js';
import { DataCard } from '../components/DataCard.js';
import { useAdopcion } from '../hooks/useAdopcion.js';
import { useHealthRecord } from '../hooks/useHealthRecord.js';


export default function AnimalAdoptadoScreen({ id_usuario }) {
  const insets = useSafeAreaInsets();
  const styles = createStyles(insets);

  const { adopcion, adopcionLoading, fetchAdopcionByUsuario } = useAdopcion();
  const { healthRecords, healthRecordLoading, fetchHealthRecordById } = useHealthRecord();

  useEffect(() => {
    if (id_usuario) {
      fetchAdopcionByUsuario(id_usuario);
    }
  }, [id_usuario]);

  useEffect(() => {
    if (adopcion?.animal?.id_animal) {
      fetchHealthRecordById(adopcion.animal.id_animal);
    }
  }, [adopcion]);

  if (adopcionLoading || healthRecordLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#3DBDB0" />
        <Text style={styles.informativeMessages}>Cargando...</Text>
      </View>
    );
  }

  if (!adopcion || !adopcion.animal) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.informativeMessages}>No tienes ningún animal adoptado aún.</Text>
      </View>
    );
  }

  const animal = adopcion.animal;

  const handleOpenDoc = (url) => {
    if (url) {
      Linking.openURL(url).catch(() =>
        alert('No se pudo abrir el documento.')
      );
    } else {
      alert('Documento no disponible.');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Cabecera */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Detalles del animal</Text>
        </View>

        {/* Carrusel de imágenes */}
        <AnimalImagesCarousel imageUrls={animal.url_foto} />

        {/* Bloque principal con fondo turquesa */}
        <View style={styles.tealBlock}>

          {/* Nombre */}
          <Text style={styles.secondaryTitle}>{animal.nombre}</Text>

          {/* Fila: Género / Edad / Tamaño */}
          <View style={styles.firstDataRow}>
            <DataCard category="Género" data={animal.genero} />
            <DataCard category="Edad" data={animal.edad} unidad_medida="años" />
            <DataCard category="Especie" data={animal.especie} />
          </View>

          {/* Sobre el animal */}
          <Text style={styles.secondaryTitle}>Sobre el animal</Text>
          <DataCard
            category=""
            data={animal.presentacion}
            style={styles.largeCard}
          />

          {/* Documentación */}
          <Text style={styles.secondaryTitle}>Documentación</Text>
          <View style={styles.docRow}>
            <Pressable
              style={styles.docCard}
              onPress={() => handleOpenDoc(healthRecords?.url_cartilla)}
            >
              <Text style={styles.docIcon}>📄</Text>
              <Text style={styles.docLabel}>Cartilla{'\n'}sanitaria</Text>
            </Pressable>

            <Pressable
              style={styles.docCard}
              onPress={() => handleOpenDoc(adopcion.url_contrato)}
            >
              <Text style={styles.docIcon}>📄</Text>
              <Text style={styles.docLabel}>Contrato{'\n'}adopción</Text>
            </Pressable>
          </View>

        </View>

        <View style={styles.bottomView} />
      </ScrollView>
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
    centeredContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
      gap: scaleSize(12),
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
    titleContainer: {
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      alignContent: 'center',
      alignItems: 'center',
      paddingHorizontal: scaleSize(15),
      paddingVertical: scaleSize(8),
    },
    title: {
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(20),
      paddingTop: scaleSize(5),
      marginBottom: scaleSize(5),
    },
    tealBlock: {
      backgroundColor: '#3DBDB0',
      paddingHorizontal: scaleSize(15),
    },
    secondaryTitle: {
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(20),
      fontWeight: 'bold',
      paddingTop: scaleSize(20),
      paddingLeft: scaleSize(5),
      paddingBottom: scaleSize(8),
    },
    firstDataRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      backgroundColor: '#3DBDB0',
      marginBottom: scaleSize(10),
    },
    largeCard: {
      width: '100%',
      minHeight: scaleSize(120),
      height: 'auto',
      marginBottom: scaleSize(10),
    },
    // ── Documentación ──
    docRow: {
      flexDirection: 'row',
      gap: scaleSize(15),
      marginBottom: scaleSize(20),
    },
    docCard: {
      backgroundColor: '#e8f7f6',
      borderRadius: scaleSize(10),
      paddingVertical: scaleSize(14),
      paddingHorizontal: scaleSize(18),
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: scaleSize(120),
    },
    docIcon: {
      fontSize: scaleFont(28),
      marginBottom: scaleSize(6),
    },
    docLabel: {
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(13),
      color: '#000000',
      textAlign: 'center',
    },
    informativeMessages: {
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(16),
      color: '#878a8a',
      textAlign: 'center',
      paddingHorizontal: scaleSize(20),
    },
    bottomView: {
      width: '100%',
      height: scaleSize(50),
      backgroundColor: '#3DBDB0',
    },
  });