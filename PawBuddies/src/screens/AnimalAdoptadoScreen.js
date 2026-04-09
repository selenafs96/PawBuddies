import { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Linking,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { scaleFont, scaleSize } from '../constants/layout.js';
import { AnimalImagesCarousel } from '../components/AnimalImagesCarousel.js';
import { DataCard } from '../components/DataCard.js';
import { BackButton } from '../components/BackButton.js';
import { useAdopcion } from '../hooks/useAdopcion.js';
import { useHealthRecord } from '../hooks/useHealthRecord.js';

// Recibe el id_usuario del adoptante autenticado como prop o desde el contexto de sesión.
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
      Linking.openURL(url).catch(() => alert('No se pudo abrir el documento.'));
    } else {
      alert('Documento no disponible.');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Cabecera: flecha izquierda + título centrado */}
        <View style={styles.titleContainer}>
          <BackButton />
          <Text style={styles.title}>Detalles del animal</Text>
          {/* Spacer para centrar el título visualmente */}
          <View style={styles.titleSpacer} />
        </View>

        {/* Carrusel de imágenes */}
        <AnimalImagesCarousel imageUrls={animal.url_foto} />

        {/* Bloque turquesa */}
        <View style={styles.tealBlock}>

          {/* Nombre */}
          <Text style={styles.sectionTitle}>{animal.nombre}</Text>

          {/* Fila: Género / Edad / Tamaño */}
          <View style={styles.dataRow}>
            <DataCard category="Género" data={animal.genero} />
            <DataCard category="Edad" data={animal.edad} unidad_medida="años" />
            <DataCard category="Tamaño" data={animal.tamano ?? animal.especie} />
          </View>

          {/* Sobre el animal */}
          <Text style={styles.sectionTitle}>Sobre el animal</Text>
          <DataCard
            category=""
            data={animal.presentacion}
            style={styles.largeCard}
          />

          {/* Documentación */}
          <Text style={styles.sectionTitle}>Documentación</Text>
          <View style={styles.docRow}>

            {/* Castración */}
            <Pressable
              style={styles.docCard}
              onPress={() => handleOpenDoc(healthRecords?.url_castracion)}
            >
              <Text style={styles.docLabel}>Castración</Text>
              <View style={styles.docCardInner}>
                <Text style={styles.docFileName}>document.pdf</Text>
                <Image
                  source={require('../../assets/icons/arrow_back.png')}
                  style={styles.docIcon}
                />
              </View>
            </Pressable>

            {/* Vacunas */}
            <Pressable
              style={styles.docCard}
              onPress={() =>
                handleOpenDoc(healthRecords?.url_vacunas ?? adopcion.url_contrato)
              }
            >
              <Text style={styles.docLabel}>Vacunas</Text>
              <View style={styles.docCardInner}>
                <Text style={styles.docFileName}>document.pdf</Text>
                <Image
                  source={require('../../assets/icons/arrow_back.png')}
                  style={styles.docIcon}
                />
              </View>
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
    },
    centeredContainer: {
      flex: 1,
      alignItems: 'center',
      gap: scaleSize(12),
    },
    scrollContainer: {
      flex: 1,
      alignSelf: 'center',
      width: '100%',
      maxWidth: 500,
    },
    scrollContent: {
      flexGrow: 1,
      paddingTop: insets.top,
    },
    // ── Cabecera ──
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      paddingVertical: scaleSize(8),
    },
    title: {
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(18),
      flex: 1,
      textAlign: 'center',
    },
  
    titleSpacer: {
      width: scaleSize(44),
    },
    // ── Bloque turquesa ──
    tealBlock: {
      backgroundColor: '#3DBDB0',
      paddingHorizontal: scaleSize(15),
      paddingBottom: scaleSize(10),
    },
    sectionTitle: {
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(18),
      fontWeight: 'bold',
      paddingTop: scaleSize(18),
      paddingBottom: scaleSize(10),
    },
    // ── Fila de DataCards (Género / Edad / Tamaño) ──
    dataRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: scaleSize(8),
      marginBottom: scaleSize(4),
    },
    // ── Card de presentación grande ──
    largeCard: {
      width: '100%',
      minHeight: scaleSize(130),
      height: 'auto',
      marginBottom: scaleSize(4),
    },
    // ── Documentación ──
    docRow: {
      flexDirection: 'row',
      gap: scaleSize(12),
      marginTop: scaleSize(4),
      marginBottom: scaleSize(20),
    },
    docCard: {
      backgroundColor: '#e8f7f6',
      borderRadius: scaleSize(10),
      paddingVertical: scaleSize(12),
      paddingHorizontal: scaleSize(14),
      flex: 1,
      gap: scaleSize(8),
    },
    docLabel: {
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(14),
      color: '#000000',
      fontWeight: 'bold',
    },
    docCardInner: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    docFileName: {
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(12),
      color: '#878a8a',
    },
    docIcon: {
      width: scaleSize(20),
      height: scaleSize(20),
      tintColor: '#3DBDB0',
      transform: [{ rotate: '180deg' }],
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
      height: scaleSize(30),
      backgroundColor: '#3DBDB0',
    },
  });