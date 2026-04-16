import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { scaleSize } from '../constants/layout';
import { supabase } from '../lib/supabase';

export const BottomNav = () => {
  const router = useRouter();
  const segments = useSegments();

  // Detecta en qué sección estás
  const activeSection = segments?.[0];

  const isNoticias = activeSection === '(noticias)';
  const isAnimals = activeSection === '(animals)';

  const handleProfilePress = async () => {
    // 1. Obtenemos la sesión actual
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error('Error al obtener la sesión:', error.message);
      return;
    }

    if (session) {
      // 2. Si hay sesión, vamos al perfil pasando el ID del usuario logueado
      router.push({
        pathname: '/(volunteers)/profile',
        params: { id_usuario: session.user.id },
      });
    } else {
      // 3. Si no hay sesión, al login (ajusta la ruta según tu estructura)
      router.push('/login');
    }
  };

  return (
    <View style={styles.bottomNav}>
      {/* NOTICIAS */}
      <TouchableOpacity
        style={[styles.navItem, isNoticias && styles.navActivo]}
        onPress={() =>
          router.push({
            pathname: '/',
          })
        }
      >
        <Image
          source={require('../../assets/icons/home.png')}
          style={[styles.icon, isNoticias && styles.iconActive]}
        />
      </TouchableOpacity>

      {/* ANIMALES */}
      <TouchableOpacity
        style={[styles.navItem, isAnimals && styles.navActivo]}
        onPress={() => router.push('/(animals)/list')}
      >
        <Image
          source={require('../../assets/icons/patas.png')}
          style={[styles.icon, isAnimals && styles.iconActive]}
        />
      </TouchableOpacity>

      {/* FAVORITOS */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => console.log('Futuros favoritos')}
      >
        <Image
          source={require('../../assets/icons/corazon.png')}
          style={styles.icon}
        />
      </TouchableOpacity>

      {/* PERFIL */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={handleProfilePress}
      >
        <Image
          source={require('../../assets/icons/perfil.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: scaleSize(50),
    position: 'absolute',
    bottom: scaleSize(6),
    left: scaleSize(70),
    right: scaleSize(70),
    height: scaleSize(50),
    paddingVertical: scaleSize(6),
    paddingHorizontal: scaleSize(16),
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  navItem: {
    padding: scaleSize(6),
    borderRadius: scaleSize(14),
  },

  navActivo: {
    backgroundColor: '#3DBDB0',
    borderRadius: scaleSize(34),
    width: scaleSize(34),
    height: scaleSize(34),
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    width: scaleSize(18),
    height: scaleSize(18),
    resizeMode: 'contain',
  },

  iconActive: {
    tintColor: '#FFFFFF',
  },
});
