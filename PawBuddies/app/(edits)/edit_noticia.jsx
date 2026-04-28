import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { supabase } from '../../src/lib/supabase';
import { BackButton } from '../../src/components/BackButton';
import { BottomNav } from '../../src/components/BottomNav';
import { scaleFont, scaleSize } from '../../src/constants/layout';

export default function EditarNoticia() {
  const { id_noticia } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const esEdicion = !!id_noticia;

  const [titulo, setTitulo] = useState('');
  const [cuerpo, setCuerpo] = useState('');
  const [urlImagen, setUrlImagen] = useState('');
  const [loading, setLoading] = useState(esEdicion);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (esEdicion) fetchNoticia();
  }, [id_noticia]);

  const fetchNoticia = async () => {
    try {
      setLoading(true);
      // ← eliminado .order() que no es compatible con .single()
      const { data, error: supabaseError } = await supabase
        .from('noticia')
        .select('titulo, cuerpo, url_imagen')
        .eq('id_noticia', id_noticia)
        .single();

      if (supabaseError) throw supabaseError;

      setTitulo(data.titulo ?? '');
      setCuerpo(data.cuerpo ?? '');
      setUrlImagen(data.url_imagen ?? '');
    } catch (err) {
      console.error('Error al cargar noticia:', err.message);
      setError('No se pudo cargar la noticia.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuardar = async () => {
    if (!titulo.trim()) {
      Alert.alert('Campo requerido', 'El título no puede estar vacío.');
      return;
    }
    if (!cuerpo.trim()) {
      Alert.alert('Campo requerido', 'El cuerpo no puede estar vacío.');
      return;
    }

    try {
      setGuardando(true);

      const imagenFinal = urlImagen.trim() || null;

      if (esEdicion) {
        const { error: updateError } = await supabase
          .from('noticia')
          .update({
            titulo: titulo.trim(),
            cuerpo: cuerpo.trim(),
            url_imagen: imagenFinal,
          })
          .eq('id_noticia', id_noticia);

        if (updateError) throw updateError;
        router.back();
      } else {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        const { error: insertError } = await supabase.from('noticia').insert({
          titulo: titulo.trim(),
          cuerpo: cuerpo.trim(),
          url_imagen: imagenFinal,
          id_usuario: user?.id ?? null,
        });

        if (insertError) throw insertError;
        router.back();
      }
    } catch (err) {
      console.error('Error al guardar noticia:', err.message);
      Alert.alert(
        'Error',
        'No se pudo guardar la noticia. Inténtalo de nuevo.',
      );
    } finally {
      setGuardando(false);
    }
  };

  const imagenPreview = urlImagen.trim() || null;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#3DBDB0' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: scaleSize(160) }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Barra superior — paddingTop con safe area */}
        <View
          style={[
            styles.titleContainer,
            { paddingTop: insets.top + scaleSize(10) },
          ]}
        >
          <BackButton />
          <Text style={styles.topTitle}>
            {esEdicion ? 'Editar noticia' : 'Nueva noticia'}
          </Text>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => router.back()}
          >
            <Text style={styles.closeBtnText}>X</Text>
          </TouchableOpacity>
        </View>

        {/* Preview imagen */}
        {imagenPreview ? (
          <Image
            source={{ uri: imagenPreview }}
            style={styles.headerImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.headerImagePlaceholder}>
            <Image
              source={require('../../assets/icons/lapiz.png')}
              style={styles.placeholderIcon}
            />
            <Text style={styles.placeholderText}>
              Introduce una URL para ver la imagen
            </Text>
          </View>
        )}

        {/* FORMULARIO */}
        <View style={styles.formContainer}>
          <View style={styles.fieldCard}>
            <Text style={styles.fieldLabel}>Título</Text>
            <TextInput
              style={styles.input}
              placeholder="Escribe el título..."
              placeholderTextColor="#AAAAAA"
              value={titulo}
              onChangeText={setTitulo}
              maxLength={120}
            />
          </View>

          <View style={styles.fieldCard}>
            <Text style={styles.fieldLabel}>URL de la imagen</Text>
            <TextInput
              style={styles.input}
              placeholder="https://..."
              placeholderTextColor="#AAAAAA"
              value={urlImagen}
              onChangeText={setUrlImagen}
              autoCapitalize="none"
              keyboardType="url"
            />
          </View>

          <View style={styles.fieldCard}>
            <Text style={styles.fieldLabel}>Contenido</Text>
            <TextInput
              style={[styles.input, styles.inputMultiline]}
              placeholder="Escribe el contenido de la noticia..."
              placeholderTextColor="#AAAAAA"
              value={cuerpo}
              onChangeText={setCuerpo}
              multiline
              textAlignVertical="top"
            />
          </View>
        </View>
      </ScrollView>

      {/* Botón guardar */}
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={[styles.guardarBtn, guardando && styles.guardarBtnDisabled]}
          onPress={handleGuardar}
          disabled={guardando}
        >
          {guardando ? (
            <ActivityIndicator color="#43B0A7" />
          ) : (
            <Text style={styles.guardarBtnText}>Guardar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3DBDB0',
  },
  titleContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleSize(20),
    paddingBottom: scaleSize(10),
  },
  topTitle: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(18),
    color: '#222',
  },
  closeBtn: {
    backgroundColor: '#E53935',
    width: scaleSize(28),
    height: scaleSize(28),
    borderRadius: scaleSize(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtnText: {
    color: '#FFFFFF',
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(13),
    fontWeight: '700',
  },
  headerImage: {
    width: '100%',
    height: scaleSize(220),
  },
  headerImagePlaceholder: {
    width: '100%',
    height: scaleSize(220),
    backgroundColor: '#2A9D90',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scaleSize(8),
  },
  placeholderIcon: {
    width: scaleSize(36),
    height: scaleSize(36),
    resizeMode: 'contain',
    tintColor: '#FFFFFF',
  },
  placeholderText: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(14),
    color: '#FFFFFF',
  },
  formContainer: {
    paddingHorizontal: scaleSize(16),
    paddingTop: scaleSize(16),
    gap: scaleSize(12),
  },
  fieldCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: scaleSize(12),
    padding: scaleSize(14),
    gap: scaleSize(6),
  },
  fieldLabel: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(12),
    fontWeight: '700',
    color: '#43B0A7',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(14),
    color: '#222222',
    paddingVertical: scaleSize(4),
  },
  inputMultiline: {
    minHeight: scaleSize(120),
    paddingTop: scaleSize(4),
  },
  footerContainer: {
    backgroundColor: '#43B0A7',
    paddingHorizontal: scaleSize(40),
    paddingVertical: scaleSize(12),
  },
  guardarBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: scaleSize(30),
    paddingVertical: scaleSize(14),
    alignItems: 'center',
  },
  guardarBtnDisabled: {
    opacity: 0.6,
  },
  guardarBtnText: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(16),
    fontWeight: '600',
    color: '#43B0A7',
  },
});
