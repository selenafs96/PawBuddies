import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { scaleFont, scaleSize } from '../../src/constants/layout';
import { useLocalSearchParams, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackButton } from '../../src/components/BackButton';
import { BottomNav } from '../../src/components/BottomNav';
import { supabase } from '../../src/lib/supabase';

export default function DetalleNoticiaEdit() {
  const { id_noticia } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [avatarError, setAvatarError] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (!id_noticia) return;
    fetchNoticia();
  }, [id_noticia]);

  const fetchNoticia = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: supabaseError } = await supabase
        .from('noticia')
        .select(`
          id_noticia,
          titulo,
          cuerpo,
          url_imagen,
          usuario (
            id_usuario,
            nombre,
            apellidos,
            url_foto,
            rol
          )
        `)
        .eq('id_noticia', id_noticia)
        .single();

      if (supabaseError) throw supabaseError;
      setNoticia(data);
    } catch (err) {
      console.error('Error al cargar la noticia:', err.message);
      setError('No se pudo cargar la noticia. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditar = () => {
    router.push({
      pathname: '/(edits)/edit_noticia', // ← corregido
      params: { id_noticia: noticia.id_noticia },
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  if (error || !noticia) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error ?? 'Noticia no encontrada.'}</Text>
      </View>
    );
  }

  const autor = noticia.usuario;
  const nombreCompleto = autor
    ? `${autor.nombre} ${autor.apellidos}`
    : 'Autor desconocido';

  return (
    <View style={{ flex: 1, backgroundColor: '#3DBDB0' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: scaleSize(160) }}
      >
        {/* Barra superior — paddingTop con safe area */}
        <View style={[styles.titleContainer, { paddingTop: insets.top + scaleSize(10) }]}>
          <BackButton />
          <Text style={styles.topTitle}>Noticia</Text>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => router.back()}
          >
            <Text style={styles.closeBtnText}>X</Text>
          </TouchableOpacity>
        </View>

        {/* Imagen principal */}
        <View>
          <Image
            source={
              noticia.url_imagen && !imgError
                ? { uri: noticia.url_imagen }
                : { uri: 'https://picsum.photos/600/400' }
            }
            style={styles.headerImage}
            onError={() => setImgError(true)}
          />

          {/* Botón lápiz flotante */}
          <TouchableOpacity style={styles.editFloatingBtn} onPress={handleEditar}>
            <Image
              source={require('../../assets/icons/lapiz.png')}
              style={styles.editFloatingIcon}
            />
          </TouchableOpacity>

          <View style={styles.dots}>
            <Text style={{ color: '#fff' }}>•••••</Text>
          </View>
        </View>

        {/* CONTENIDO */}
        <View style={styles.container}>

          {/* Card autor */}
          <View style={styles.titleCard}>
            {autor?.url_foto && !avatarError ? (
              <Image
                source={{ uri: autor.url_foto }}
                style={styles.avatar}
                onError={() => setAvatarError(true)}
              />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <Text style={styles.avatarPlaceholderText}>
                  {autor?.nombre?.[0] ?? '?'}
                </Text>
              </View>
            )}
            <View style={{ flex: 1 }}>
              <Text style={styles.title} numberOfLines={2}>
                {noticia.titulo}
              </Text>
              <Text style={styles.subtitle}>
                {nombreCompleto} · {autor?.rol ?? ''}
              </Text>
            </View>
          </View>

          {/* Cuerpo */}
          <View style={styles.contentCard}>
            <Text style={styles.text}>{noticia.cuerpo}</Text>
          </View>

          {/* Comentarios — pendiente de tabla de comentarios */}
          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.commentCard}>
              <View style={{ flexDirection: 'row', gap: scaleSize(10) }}>
                <Image
                  source={{ uri: 'https://picsum.photos/100' }}
                  style={styles.avatar}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>Nombre Apellido {item}</Text>
                  <Text style={styles.subtitle}>Persona adoptante</Text>
                  <Text style={styles.text}>
                    Figma ipsum component variant main layer. Style boolean italic star pixel mask underline.
                  </Text>
                </View>
              </View>
            </View>
          ))}

        </View>
      </ScrollView>

      {/* Botón guardar — navega a editar */}
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.guardarBtn} onPress={handleEditar}>
          <Text style={styles.guardarBtnText}>Guardar</Text>
        </TouchableOpacity>
      </View>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3DBDB0',
    borderBottomLeftRadius: scaleSize(14),
    borderBottomRightRadius: scaleSize(14),
    paddingBottom: scaleSize(20),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3DBDB0',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3DBDB0',
    paddingHorizontal: scaleSize(30),
  },
  errorText: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(15),
    color: '#FFFFFF',
    textAlign: 'center',
  },

  // Barra superior — paddingTop se sobreescribe inline con insets
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

  // Imagen header
  headerImage: {
    width: '100%',
    height: scaleSize(220),
  },
  editFloatingBtn: {
    position: 'absolute',
    bottom: scaleSize(16),
    right: scaleSize(16),
    backgroundColor: '#43B0A7',
    width: scaleSize(40),
    height: scaleSize(40),
    borderRadius: scaleSize(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  editFloatingIcon: {
    width: scaleSize(20),
    height: scaleSize(20),
    resizeMode: 'contain',
    tintColor: '#FFFFFF',
  },
  dots: {
    position: 'absolute',
    bottom: scaleSize(10),
    alignSelf: 'center',
    backgroundColor: '#888',
    borderRadius: scaleSize(10),
    paddingHorizontal: scaleSize(6),
    paddingVertical: scaleSize(2),
  },

  // Card autor
  titleCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: scaleSize(16),
    marginTop: scaleSize(-20),
    padding: scaleSize(14),
    borderRadius: scaleSize(20),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleSize(10),
  },
  avatar: {
    width: scaleSize(40),
    height: scaleSize(40),
    borderRadius: scaleSize(20),
  },
  avatarPlaceholder: {
    backgroundColor: '#43B0A7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarPlaceholderText: {
    color: '#FFFFFF',
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(16),
    fontWeight: '700',
  },
  title: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(14),
    fontWeight: '600',
    color: '#222',
  },
  subtitle: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(12),
    color: '#888',
  },
  contentCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: scaleSize(16),
    marginTop: scaleSize(7),
    padding: scaleSize(14),
    borderRadius: scaleSize(10),
  },
  text: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(13),
    color: '#222',
    lineHeight: scaleSize(18),
  },
  commentCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: scaleSize(16),
    marginLeft: scaleSize(45),
    marginTop: scaleSize(7),
    padding: scaleSize(14),
    borderRadius: scaleSize(10),
    borderTopLeftRadius: scaleSize(0),
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
  guardarBtnText: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(16),
    fontWeight: '600',
    color: '#43B0A7',
  },
});