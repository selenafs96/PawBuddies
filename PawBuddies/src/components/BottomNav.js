import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { scaleSize } from '../constants/layout';
import { supabase } from '../lib/supabase';
import { useEffect, useState } from 'react';

export const BottomNav = () => {

  //Checkeamos si el usuario está conectado o no para al presionar favoritos le lleve al login si no lo está
  const [userId, setUserId] = useState(null);

    useEffect(() => {
      const checkSession = async () => {
        const {
          data: { session },
        } = await supabase.auth.getSession();
  
        if (session) {
          setUserId(session.user.id);
        }
      };
      checkSession();
    }, []);



  const router = useRouter();
  const segments = useSegments();

  // Detecta en qué sección estás
  const activeSection = segments?.[0];

  const isNoticias = activeSection === '(noticias)';
  const isAnimals = activeSection === '(animals)';

  const handleProfilePress = async () => {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error || !session) {
      router.push('/login');
      return;
    }

    // Consultamos el rol del usuario
    const { data: usuario } = await supabase
      .from('usuario')
      .select('rol')
      .eq('id_usuario', session.user.id)
      .single();

    if (usuario?.rol === 'Adoptante') {
      router.push({
        pathname: '/(adopters)/profile',
        params: { id_usuario: session.user.id },
      });
    } else {
      router.push({
        pathname: '/(volunteers)/profile',
        params: { id_usuario: session.user.id },
      });
    }
  };

  const handleFavPress = () => {

    if(!userId) {
      router.push('/login');
      return;
    }
    router.push('/(animals)/AdoptaConfirmScreen');
  }

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
        onPress={handleFavPress}
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
    bottom: scaleSize(10),
    left: scaleSize(40),
    right: scaleSize(40),
    height: scaleSize(64),
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
    width: scaleSize(22),
    height: scaleSize(22),
    resizeMode: 'contain',
  },

  iconActive: {
    tintColor: '#FFFFFF',
  },
});
