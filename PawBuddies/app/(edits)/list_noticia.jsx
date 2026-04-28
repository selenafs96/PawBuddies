import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { supabase } from '../../src/lib/supabase';
import { BackButton } from '../../src/components/BackButton';
import { scaleFont, scaleSize } from '../../src/constants/layout';

export default function NoticiasEdit() {
  const insets = useSafeAreaInsets();
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNoticias();
  }, []);

  const fetchNoticias = async () => {
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
        .order('created_at', { ascending: false });

      if (supabaseError) throw supabaseError;
      setNoticias(data || []);
    } catch (err) {
      console.error('Error al cargar noticias:', err.message);
      setError('No se pudieron cargar las noticias.');
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = (noticia) => {
    Alert.alert(
      'Eliminar noticia',
      `¿Eliminar "${noticia.titulo}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => eliminarNoticia(noticia.id_noticia),
        },
      ]
    );
  };

  const eliminarNoticia = async (id_noticia) => {
    try {
      const { error: supabaseError } = await supabase
        .from('noticia')
        .delete()
        .eq('id_noticia', id_noticia);

      if (supabaseError) throw supabaseError;
      setNoticias((prev) => prev.filter((n) => n.id_noticia !== id_noticia));
    } catch (err) {
      console.error('Error al eliminar:', err.message);
      Alert.alert('Error', 'No se pudo eliminar la noticia.');
    }
  };

  const handleNoticiaPress = (noticia) => {
    router.push({
      pathname: '/(edits)/[id_noticia]',
      params: { id_noticia: noticia.id_noticia },
    });
  };

  const handleCrear = () => {
    router.push('/(edits)/edit_noticia');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchNoticias}>
          <Text style={styles.retryText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    // ── Contenedor raíz — flex:1 y fondo blanco ──────────
    <View style={styles.container}>

      {/* Barra superior — paddingTop dinámico con insets */}
      <View style={[styles.titleContainer, { paddingTop: insets.top + scaleSize(10) }]}>
        <BackButton />
        <Text style={styles.topTitle}>Noticias</Text>
        <TouchableOpacity
          onPress={handleCrear}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Image
            source={require('../../assets/icons/lapiz.png')}
            style={styles.editButton}
          />
        </TouchableOpacity>
      </View>

      {/* Lista */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {noticias.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay noticias disponibles.</Text>
          </View>
        ) : (
          noticias.map((item) => (
            <NoticiaCardEdit
              key={item.id_noticia}
              item={item}
              onPress={() => handleNoticiaPress(item)}
              onEliminar={() => handleEliminar(item)}
            />
          ))
        )}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.guardarBtn} onPress={() => router.back()}>
          <Text style={styles.guardarBtnText}>Guardar</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

// ── Card ───────────────────────────────────────────────────
function NoticiaCardEdit({ item, onPress, onEliminar }) {
  const [imgError, setImgError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const autor = item.usuario;
  const nombreCompleto = autor
    ? `${autor.nombre} ${autor.apellidos}`
    : 'Autor desconocido';

  return (
    <View style={styles.card}>

      {/* Cabecera con botón eliminar */}
      <View style={styles.cardHeader}>
        <View style={styles.cardHeaderLeft}>
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
            <Text style={styles.authorName} numberOfLines={1}>{nombreCompleto}</Text>
            <Text style={styles.authorRole}>{autor?.rol ?? ''}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={onEliminar}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.deleteBtnText}>X</Text>
        </TouchableOpacity>
      </View>

      {/* Imagen + descripción — navega al detalle */}
      <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
        {item.url_imagen && !imgError ? (
          <Image
            source={{ uri: item.url_imagen }}
            style={styles.cardImage}
            resizeMode="cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <View style={styles.cardImagePlaceholder}>
            <Text style={styles.cardImagePlaceholderText}>Sin imagen</Text>
          </View>
        )}
        <View style={styles.cardBody}>
          <Text style={styles.cardDescription} numberOfLines={3}>
            {item.cuerpo}
          </Text>
        </View>
      </TouchableOpacity>

    </View>
  );
}

// ── Estilos — insets se aplica inline, NO aquí ────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#43B0A7',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: scaleSize(30),
    gap: scaleSize(16),
  },
  errorText: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(15),
    color: '#666666',
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#43B0A7',
    paddingVertical: scaleSize(12),
    paddingHorizontal: scaleSize(30),
    borderRadius: scaleSize(12),
  },
  retryText: {
    fontFamily: 'TiltNeon',
    color: '#FFFFFF',
    fontSize: scaleFont(15),
    fontWeight: '600',
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
    color: '#222',
  },
  editButton: {
    width: scaleSize(24),
    height: scaleSize(24),
    resizeMode: 'contain',
    tintColor: '#43B0A7',
  },

  // Scroll
  scrollViewContainer: {
    flex: 1,
    backgroundColor: '#43B0A7',
  },
  scrollContent: {
    alignItems: 'center',
    paddingTop: scaleSize(12),
    paddingBottom: scaleSize(20),
    gap: scaleSize(14),
  },
  emptyContainer: {
    marginTop: scaleSize(60),
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(15),
    color: '#FFFFFF',
  },

  // Card
  card: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: scaleSize(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scaleSize(2) },
    shadowOpacity: 0.1,
    shadowRadius: scaleSize(8),
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleSize(12),
    paddingVertical: scaleSize(10),
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleSize(10),
    flex: 1,
    marginRight: scaleSize(10),
  },
  avatar: {
    width: scaleSize(38),
    height: scaleSize(38),
    borderRadius: scaleSize(19),
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
  authorName: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(13),
    fontWeight: '600',
    color: '#222222',
  },
  authorRole: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(11),
    color: '#888888',
  },
  deleteBtn: {
    backgroundColor: '#E53935',
    width: scaleSize(30),
    height: scaleSize(30),
    borderRadius: scaleSize(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtnText: {
    color: '#FFFFFF',
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(13),
    fontWeight: '700',
  },
  cardImage: {
    width: '100%',
    height: scaleSize(180),
  },
  cardImagePlaceholder: {
    width: '100%',
    height: scaleSize(180),
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImagePlaceholderText: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(13),
    color: '#999999',
  },
  cardBody: {
    paddingHorizontal: scaleSize(14),
    paddingBottom: scaleSize(14),
    paddingTop: scaleSize(8),
  },
  cardDescription: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(13),
    color: '#666666',
    lineHeight: scaleFont(20),
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