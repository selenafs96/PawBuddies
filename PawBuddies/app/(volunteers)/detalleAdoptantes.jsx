import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { supabase } from '../../src/lib/supabase';
import { scaleFont, scaleSize } from '../../src/constants/layout';
import { BackButton } from '../../src/components/BackButton';

export default function PerfilAdoptante() {
  const { id_usuario } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const [adoptante, setAdoptante] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (id_usuario) fetchAdoptante();
  }, [id_usuario]);

  const fetchAdoptante = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: supabaseError } = await supabase
        .from('usuario')
        .select(`
          id_usuario,
          nombre,
          apellidos,
          email,
          telefono,
          url_foto,
          localidad_preferida,
          radio_maximo_km,
          descripcion,
          perros_propiedad,
          gatos_propiedad,
          otros_propiedad
        `)
        .eq('id_usuario', id_usuario)
        .single();

      if (supabaseError) throw supabaseError;
      setAdoptante(data);
    } catch (err) {
      console.error('Error al cargar adoptante:', err.message);
      setError('No se pudo cargar el perfil del adoptante.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#43B0A7" />
      </View>
    );
  }

  if (error || !adoptante) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error ?? 'Adoptante no encontrado.'}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* Barra superior */}
      <View style={[styles.headerSection, { paddingTop: insets.top + scaleSize(10) }]}>
        <BackButton />
        <Text style={styles.headerTitle}>Detalles del adoptante</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Imagen principal */}
        <View style={styles.heroSection}>
          {adoptante.url_foto && !imgError ? (
            <Image
              source={{ uri: adoptante.url_foto }}
              style={styles.heroImage}
              resizeMode="cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <View style={styles.heroPlaceholder}>
              <Text style={styles.heroPlaceholderText}>Sin foto</Text>
            </View>
          )}
        </View>

    <View style={{ paddingHorizontal: scaleSize(20) }}>
        {/* Nombre + stats */}
        <View style={styles.workerInfoSection}>
          <Text style={styles.workerName}>
            {adoptante.nombre} {adoptante.apellidos}
          </Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Ciudad</Text>
              <Text style={styles.infoValue}>
                {adoptante.localidad_preferida ?? '—'}
              </Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Perros</Text>
              <Text style={styles.infoValue}>
                {adoptante.perros_propiedad ?? 0}
              </Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Gatos</Text>
              <Text style={styles.infoValue}>
                {adoptante.gatos_propiedad ?? 0}
              </Text>
            </View>
          </View>
        </View>

        {/* Sobre el adoptante */}
        <View style={styles.aboutSection}>
          <Text style={styles.sectionTitle}>Sobre el adoptante</Text>
          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionText}>
              {adoptante.descripcion ?? 'Sin descripción.'}
            </Text>
          </View>
        </View>

        {/* Localización */}
        <View style={styles.aboutSection}>
          <Text style={styles.sectionTitle}>Localización</Text>
          <View style={styles.locationBox}>
            <Text style={styles.locationText}>
              📍 {adoptante.localidad_preferida ?? '—'}
            </Text>
            {adoptante.radio_maximo_km ? (
              <Text style={styles.locationSubtext}>
                Radio máximo: {adoptante.radio_maximo_km} km
              </Text>
            ) : null}
          </View>
        </View>

        {/* Contacto */}
        <View style={styles.aboutSection}>
          <Text style={styles.sectionTitle}>Contacto</Text>
          <View style={styles.infoGrid}>
            <View style={[styles.infoBox, { flex: 1 }]}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue} numberOfLines={1}>
                {adoptante.email ?? '—'}
              </Text>
            </View>
            <View style={[styles.infoBox, { flex: 1 }]}>
              <Text style={styles.infoLabel}>Teléfono</Text>
              <Text style={styles.infoValue}>
                {adoptante.telefono ?? '—'}
              </Text>
            </View>
          </View>
        </View>

        {/* Documentación */}
        <View style={styles.documentationSection}>
          <Text style={styles.sectionTitle}>Documentación</Text>
          <View style={styles.descriptionBox}>
            <Text style={styles.docLabel}>Documento de propiedad</Text>
            <View style={styles.docFile}>
              <Text style={styles.docFileName}>documento_de_propiedad.pdf</Text>
              <Image
                source={require('../../assets/icons/share.png')}
                style={styles.docIcon}
              />
            </View>
          </View>
        </View>
    </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#43B0A7',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(15),
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: scaleSize(30),
  },
  headerSection: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleSize(20),
    paddingBottom: scaleSize(10),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: scaleFont(18),
    fontFamily: 'TiltNeon',
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
  scrollContent: {
    paddingBottom: scaleSize(100),
  },
  heroSection: {
    width: '100%',
    height: scaleSize(220),
    backgroundColor: '#E0E0E0',
    marginBottom: scaleSize(20),
    overflow: 'hidden',
    borderBottomLeftRadius: scaleSize(10),
    borderBottomRightRadius: scaleSize(10),
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
  },
  heroPlaceholderText: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(14),
    color: '#999',
  },
  workerInfoSection: {
    marginBottom: scaleSize(20),
    gap: scaleSize(10),
  },
  workerName: {
    fontSize: scaleFont(16),
    fontFamily: 'TiltNeon',
    fontWeight: '#FFFFFF',
    color: '#000',
  },
  infoGrid: {
    flexDirection: 'row',
    gap: scaleSize(10),
  },
  infoBox: {
    flex: 1,
    backgroundColor: '#E8F7F6',
    paddingVertical: scaleSize(10),
    paddingHorizontal: scaleSize(12),
    borderRadius: scaleSize(9),
    gap: scaleSize(4),
  },
  infoLabel: {
    fontSize: scaleFont(11),
    fontFamily: 'TiltNeon',
    color: '#6A6A6A',
  },
  infoValue: {
    fontSize: scaleFont(12),
    fontFamily: 'TiltNeon',
    color: '#000',
    fontWeight: '600',
  },
  aboutSection: {
    marginBottom: scaleSize(20),
    gap: scaleSize(8),
  },
  sectionTitle: {
    fontSize: scaleFont(16),
    fontFamily: 'TiltNeon',
    color: '#000',
    fontWeight: '600',
  },
  descriptionBox: {
    backgroundColor: '#E8F7F6',
    paddingVertical: scaleSize(12),
    paddingHorizontal: scaleSize(14),
    borderRadius: scaleSize(9),
    minHeight: scaleSize(80),
  },
  descriptionText: {
    fontSize: scaleFont(13),
    fontFamily: 'TiltNeon',
    color: '#000',
    lineHeight: scaleFont(20),
  },
  locationBox: {
    backgroundColor: '#E8F7F6',
    paddingVertical: scaleSize(16),
    paddingHorizontal: scaleSize(14),
    borderRadius: scaleSize(9),
    gap: scaleSize(6),
  },
  locationText: {
    fontSize: scaleFont(14),
    fontFamily: 'TiltNeon',
    color: '#222',
    fontWeight: '600',
  },
  locationSubtext: {
    fontSize: scaleFont(12),
    fontFamily: 'TiltNeon',
    color: '#6A6A6A',
  },
  docLabel: {
    fontSize: scaleFont(12),
    fontFamily: 'TiltNeon',
    color: '#6A6A6A',
  },
  docFile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#636363',
    borderRadius: scaleSize(10),
    paddingHorizontal: scaleSize(12),
    paddingVertical: scaleSize(12),
  },
  docFileName: {
    fontSize: scaleFont(12),
    fontFamily: 'TiltNeon',
    color: '#AEAEAE',
  },
  docIcon: {
    width: scaleSize(22),
    height: scaleSize(22),
    resizeMode: 'contain',
    tintColor: '#43B0A7',
  },
});