import { Image, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ScreenHeader from '../../src/components/ScreenHeader';
import ImageNameEmailVolunteerCard from '../../src/components/ImageNameEmailVolunteerCard';
import { scaleFont, scaleSize } from '../../src/constants/layout';
import StatCard from '../../src/components/StatCard';
import ProfileMenuItem from '../../src/components/ProfileMenuItem';
import { router } from 'expo-router';
import { supabase } from '../../src/lib/supabase';
import { BottomNav } from '../../src/components/BottomNav';

export default function VolunteerProfile() {
  const insets = useSafeAreaInsets();
  const styles = createStyles(insets);

  const cerrarSesion = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error al cerrar sesión:', error.message);
      return { success: false, message: error.message };
    }

    console.log('Sesión cerrada correctamente');
    router.replace('/');
  };

  return (
    <View style={styles.mainContainer}>
      <ScreenHeader title="Perfil" />
      <View style={styles.secondaryContainer}>
        <View style={{ alignItems: 'flex-start', width: '100%' }}>
          <ImageNameEmailVolunteerCard />
        </View>
        <View style={styles.row}>
          <StatCard number="50" stat="perros" />
          <StatCard number="47" stat="gatos" />
          <StatCard number="5" stat="voluntarios" />
        </View>
        <View style={styles.menuContainer}>
          <Text style={styles.gestiones}>Gestiones</Text>
          <ProfileMenuItem action="Registro de animales" />
          <ProfileMenuItem action="Registro de noticias" />
          <ProfileMenuItem action="Registro de voluntarios" />
          <ProfileMenuItem action="Gestión de inventario" />
          <ProfileMenuItem action="Cerrar sesión" onPress={cerrarSesion} />
        </View>
      </View>
      <Image
        source={require('../../assets/icons/Logo.png')}
        style={styles.logo}
      />
      <BottomNav />
    </View>
  );
}

const createStyles = (insets) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      width: '100%',
    },
    secondaryContainer: {
      flex: 1,
      paddingHorizontal: scaleSize(18),
      gap: scaleSize(40),
    },
    menuContainer: {
      width: '100%',
      padding: scaleSize(10),
      backgroundColor: '#e8f7f6',
      borderRadius: scaleSize(5),
      marginBottom: scaleSize(5),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    gestiones: {
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(13),
      marginBottom: scaleSize(5),
    },
    logo: {
      alignSelf: 'center',
      marginBottom: insets.bottom + scaleSize(50),
    },
  });
