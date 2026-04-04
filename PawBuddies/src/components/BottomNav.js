import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { scaleSize } from '../constants/layout';

export const BottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (route) => pathname.includes(route);

  return (
    <View style={styles.bottomNav}>

      {/* HOME */}
      <TouchableOpacity
        style={[styles.navItem, isActive('/home') && styles.navActivo]}
        onPress={() => router.push('/home')}
      >
        <Image
          source={require('../../assets/icons/home.png')}
          style={[
            styles.icon,
            isActive('/home') && styles.iconActive
          ]}
        />
      </TouchableOpacity>

      {/* ANIMALES */}
      <TouchableOpacity
        style={[styles.navItem, isActive('/animals') && styles.navActivo]}
        onPress={() => router.push('/(animals)/list')}
      >
        <Image
          source={require('../../assets/icons/patas.png')}
          style={[
            styles.icon,
            isActive('/animals') && styles.iconActive
          ]}
        />
      </TouchableOpacity>

      {/* FAVORITOS */}
      <TouchableOpacity
        style={[styles.navItem, isActive('/favoritos') && styles.navActivo]}
        onPress={() => router.push('/favoritos')}
      >
        <Image
          source={require('../../assets/icons/corazon.png')}
          style={[
            styles.icon,
            isActive('/favoritos') && styles.iconActive
          ]}
        />
      </TouchableOpacity>

      {/* PERFIL */}
      <TouchableOpacity
        style={[styles.navItem, isActive('/perfil') && styles.navActivo]}
        onPress={() => router.push('/perfil')}
      >
        <Image
          source={require('../../assets/icons/perfil.png')}
          style={[
            styles.icon,
            isActive('/perfil') && styles.iconActive
          ]}
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