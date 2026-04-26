import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { supabase } from '../../src/lib/supabase';
import FilterTabs from '../../src/components/FilterTabs';
import NewsHeader from '../../src/components/NewsHeader';
import { BottomNav } from '../../src/components/BottomNav';
import { scaleFont, scaleSize } from '../../src/constants/layout';

const CATEGORIAS = ['All', 'Adoption', 'News', 'Articles', 'Lost & Found'];

export default function Noticias() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('news');
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

      // JOIN con usuario para traer nombre, apellidos, foto y rol del autor
      const { data, error: supabaseError } = await supabase
        .from('noticia')
        .select(
          `
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
        `,
        )
        .order('id_noticia', { ascending: false });

      if (supabaseError) throw supabaseError;
      setNoticias(data || []);
    } catch (err) {
      console.error('Error al cargar noticias:', err.message);
      setError('No se pudieron cargar las noticias. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // NOTA: filtro por categoría pendiente hasta que exista esa columna en la tabla
  const filteredNoticias = noticias;

  const handleNoticiaPress = (noticia) => {
    router.push({
      pathname: '/(noticias)/[id_noticia]',
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
    <View style={styles.container}>
      <View style={styles.header}>
        <NewsHeader />
        <FilterTabs
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          categorias={CATEGORIAS}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredNoticias.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay noticias disponibles.</Text>
          </View>
        ) : (
          filteredNoticias.map((item) => (
            <NoticiaCard
              key={item.id_noticia}
              item={item}
              onPress={() => handleNoticiaPress(item)}
            />
          ))
        )}
      </ScrollView>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </View>
  );
}

function NoticiaCard({ item, onPress }) {
  const [imgError, setImgError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const autor = item.usuario;
  const nombreCompleto = autor
    ? `${autor.nombre} ${autor.apellidos}`
    : 'Autor desconocido';

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* Cabecera: avatar + nombre + rol + menú */}
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
          <View>
            <Text style={styles.authorName}>{nombreCompleto}</Text>
            <Text style={styles.authorRole}>{autor?.rol ?? ''}</Text>
          </View>
        </View>
        {/* "Tres puntos" sin funcionalidad por ahora */}
        <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={styles.menuDots}>⋯</Text>
        </TouchableOpacity>
      </View>

      {/* Imagen de la noticia */}
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

      {/* Botones de acción */}
      <View style={styles.actionsRow}>
        <View style={styles.actionsLeft}>
          {/* Corazón toggle — tintColor para simular estado activo */}
          <TouchableOpacity
            onPress={() => setLiked(!liked)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Image
              source={require('../../assets/icons/fav_empty.png')}
              style={[styles.actionIcon, liked && styles.actionIconLiked]}
            />
          </TouchableOpacity>

          {/* Comentarios sin funcionalidad por ahora */}
          <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Image
              source={require('../../assets/icons/comment.png')}
              style={styles.actionIcon}
            />
          </TouchableOpacity>

          {/* Compartir sin funcionalidad por ahora */}
          <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Image
              source={require('../../assets/icons/share_.png')}
              style={styles.actionIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Guardar toggle — tintColor para simular estado activo */}
        <TouchableOpacity
          onPress={() => setSaved(!saved)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Image
            source={require('../../assets/icons/bookmark.png')}
            style={[styles.actionIcon, saved && styles.actionIconSaved]}
          />
        </TouchableOpacity>
      </View>

      {/* Descripción */}
      <View style={styles.cardBody}>
        <Text style={styles.cardDescription} numberOfLines={3}>
          {item.cuerpo}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
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
  scrollViewContainer: {
    flex: 1,
    backgroundColor: '#43B0A7',
  },
  scrollContent: {
    alignItems: 'center',
    paddingTop: scaleSize(12),
    paddingBottom: scaleSize(120),
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
  card: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: scaleSize(16),
    overflow: 'hidden',
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
  menuDots: {
    fontSize: scaleFont(20),
    color: '#888888',
    lineHeight: scaleFont(20),
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
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleSize(14),
    paddingVertical: scaleSize(10),
  },
  actionsLeft: {
    flexDirection: 'row',
    gap: scaleSize(16),
  },
  actionIcon: {
    width: scaleSize(24),
    height: scaleSize(24),
    resizeMode: 'contain',
  },
  actionIconLiked: {
    tintColor: '#43B0A7',
  },
  actionIconSaved: {
    tintColor: '#43B0A7',
  },
  cardBody: {
    paddingHorizontal: scaleSize(14),
    paddingBottom: scaleSize(14),
  },
  cardDescription: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(13),
    color: '#666666',
    lineHeight: scaleFont(20),
  },
});
