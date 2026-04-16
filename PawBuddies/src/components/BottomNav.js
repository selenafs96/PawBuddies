import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { scaleSize } from '../constants/layout';

export const BottomNav = () => {
  const router = useRouter();
  const segments = useSegments();

  // Detecta en qué sección estás
  const activeSection = segments?.[0];

  const isNoticias = activeSection === '(noticias)';
  const isAnimals = activeSection === '(animals)';

  return (
    <View style={styles.bottomNav}>

      {/* NOTICIAS */}
      <TouchableOpacity
        style={[styles.navItem, isNoticias && styles.navActivo]}
        onPress={() => router.push({
            pathname: '/(noticias)/[id_noticia]',
            params: { id_noticia: '123' },
          })
        }
      >
        <Image
          source={require('../../assets/icons/home.png')}
          style={[
            styles.icon,
            isNoticias && styles.iconActive
          ]}
        />
      </TouchableOpacity>

      {/* ANIMALES */}
      <TouchableOpacity
        style={[styles.navItem, isAnimals && styles.navActivo]}
        onPress={() => router.push('/(animals)/list')}
      >
        <Image
          source={require('../../assets/icons/patas.png')}
          style={[
            styles.icon,
            isAnimals && styles.iconActive
          ]}
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
        onPress={() => {
          router.push({
            pathname:'/(volunteers)/profile',
            params: { id_usuario: 'fe04b85b-255d-475a-8d7c-cd0bf1aa9823' }
          });
        }}
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