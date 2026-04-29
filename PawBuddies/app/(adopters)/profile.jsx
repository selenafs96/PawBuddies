import { Image, StyleSheet, Text, View, TouchableOpacity, Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ScreenHeader from '../../src/components/ScreenHeader';
import { scaleFont, scaleSize } from '../../src/constants/layout';
import ProfileMenuItem from '../../src/components/ProfileMenuItem';
import { router, useLocalSearchParams } from 'expo-router';
import { supabase } from '../../src/lib/supabase';
import { BottomNav } from '../../src/components/BottomNav';
import { useUsers } from '../../src/hooks/useUsers';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AdopterProfile() {
  const insets = useSafeAreaInsets();
  const styles = createStyles(insets);
  const { id_usuario } = useLocalSearchParams();

  const { users, loading, fetchUserById } = useUsers();

  // Preferencias locales — se persisten con AsyncStorage
  // hasta que exista columna en Supabase
  const [prefPerro, setPrefPerro] = useState(false);
  const [prefGato, setPrefGato] = useState(false);
  const [prefOtros, setPrefOtros] = useState(false);

  // Número de favoritos
  const [numFavoritos, setNumFavoritos] = useState(0);

  useEffect(() => {
    if (id_usuario) {
      fetchUserById(id_usuario);
      fetchFavoritos(id_usuario);
      cargarPreferencias(id_usuario);
    }
  }, [id_usuario]);

  // ── Favoritos ──────────────────────────────────────────
  const fetchFavoritos = async (id) => {
    try {
      const { count, error } = await supabase
        .from('favorito')
        .select('id_favorito', { count: 'exact', head: true })
        .eq('id_usuario', id);

      if (!error) setNumFavoritos(count ?? 0);
    } catch (err) {
      console.error('Error al cargar favoritos:', err.message);
    }
  };

  const handleVerFavoritos = () => {
    router.push({
      pathname: '/(animals)/AdoptaConfirmScreen',
      params: { id_usuario },
    });
  };

  // ── Preferencias con AsyncStorage ─────────────────────
  const cargarPreferencias = async (id) => {
    try {
      const raw = await AsyncStorage.getItem(`preferencias_${id}`);
      if (raw) {
        const prefs = JSON.parse(raw);
        setPrefPerro(prefs.perro ?? false);
        setPrefGato(prefs.gato ?? false);
        setPrefOtros(prefs.otros ?? false);
      }
    } catch (err) {
      console.error('Error al cargar preferencias:', err.message);
    }
  };

  const guardarPreferencia = async (key, value) => {
    try {
      const raw = await AsyncStorage.getItem(`preferencias_${id_usuario}`);
      const prefs = raw ? JSON.parse(raw) : {};
      prefs[key] = value;
      await AsyncStorage.setItem(`preferencias_${id_usuario}`, JSON.stringify(prefs));
    } catch (err) {
      console.error('Error al guardar preferencia:', err.message);
    }
  };

  const handlePrefPerro = (val) => {
    setPrefPerro(val);
    guardarPreferencia('perro', val);
  };
  const handlePrefGato = (val) => {
    setPrefGato(val);
    guardarPreferencia('gato', val);
  };
  const handlePrefOtros = (val) => {
    setPrefOtros(val);
    guardarPreferencia('otros', val);
  };

  // Localidad - Ciudad o C.P.
  const formatLocalidad = (localidad) => {
    if (!localidad) return '—';
    const esCodigoPostal = /^\d{4,5}$/.test(localidad.trim());
    if (esCodigoPostal) {
      // Si es solo el C.P., se muestra como "C.P."
      return `— ${localidad}`;
    }
    // Si contiene guión ya formateado o es texto libre (como la ciudad), se muestra tal cual
    return localidad;
  };

  // Sesión
  const cerrarSesion = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error al cerrar sesión:', error.message);
      return;
    }
    router.replace('/');
  };

  const handleOlvideContrasena = () => {
    // TODO: Queda implementar recuperación de contraseña
  };

  if (loading)
    return <Text style={styles.informativeMessages}>Cargando...</Text>;
  if (!users)
    return (
      <Text style={styles.informativeMessages}>Usuario no encontrado</Text>
    );

  return (
    <View style={styles.mainContainer}>
      <ScreenHeader title="Perfil" />

      <View style={styles.secondaryContainer}>

        {/* Avatar + nombre + email */}
        <View style={styles.userCard}>
          {users.url_foto ? (
            <Image source={{ uri: users.url_foto }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder]}>
              <Text style={styles.avatarPlaceholderText}>
                {users.nombre?.[0] ?? '?'}
              </Text>
            </View>
          )}
          <View>
            <Text style={styles.userName}>
              {users.nombre} {users.apellidos}
            </Text>
            <Text style={styles.userEmail}>{users.email}</Text>
          </View>
        </View>

        {/* Animales favoritos */}
        <View style={styles.adoptadoCard}>
          <View style={styles.adoptadoLeft}>
            <View style={styles.adoptadoIconContainer}>
              <Image
                source={require('../../assets/icons/patas.png')}
                style={styles.adoptadoIcon}
              />
            </View>
            <View>
              <Text style={styles.adoptadoLabel}>Adoptado</Text>
              <Text style={styles.adoptadoNumber}>{numFavoritos}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.verBtn} onPress={handleVerFavoritos}>
            <Text style={styles.verBtnText}>Ver</Text>
          </TouchableOpacity>
        </View>

        {/* Preferencias */}
        <View style={styles.menuContainer}>
          <Text style={styles.sectionLabel}>Preferencias</Text>
          <View style={styles.preferencesRow}>
            <TouchableOpacity
              style={styles.preferenceItem}
              onPress={() => handlePrefPerro(!prefPerro)}
            >
              <View style={[styles.checkbox, prefPerro && styles.checkboxChecked]}>
                {prefPerro && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.preferenceLabel}>Perro</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.preferenceItem}
              onPress={() => handlePrefGato(!prefGato)}
            >
              <View style={[styles.checkbox, prefGato && styles.checkboxChecked]}>
                {prefGato && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.preferenceLabel}>Gato</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.preferenceItem}
              onPress={() => handlePrefOtros(!prefOtros)}
            >
              <View style={[styles.checkbox, prefOtros && styles.checkboxChecked]}>
                {prefOtros && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.preferenceLabel}>Otros</Text>
            </TouchableOpacity>
          </View>

          {/* Ciudad o código postal */}
          <Text style={styles.localidad}>
            {formatLocalidad(users.localidad_preferida)}
            {users.radio_maximo_km ? ` · ${users.radio_maximo_km} km` : ''}
          </Text>
        </View>

        {/* Documento de propiedad — placeholder */}
        {/* Modificable cuándo se puedan subir documentos */}
        <TouchableOpacity style={styles.documentoBtn}>
          <Text style={styles.documentoBtnText}>Documento_de_propiedad.pdf</Text>
          <Image
            source={require('../../assets/icons/share.png')}
            style={styles.documentoIcon}
          />
        </TouchableOpacity>

        {/* Cuenta */}
        <View style={styles.menuContainer}>
          <Text style={styles.sectionLabel}>Cuenta</Text>
          <ProfileMenuItem
            action="Me olvidé de la contraseña"
            onPress={handleOlvideContrasena}
          />
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
      gap: scaleSize(16),
      paddingTop: scaleSize(10),
    },
    informativeMessages: {
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(14),
      textAlign: 'center',
      marginTop: scaleSize(40),
    },
    userCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scaleSize(14),
    },
    avatar: {
      width: scaleSize(56),
      height: scaleSize(56),
      borderRadius: scaleSize(28),
    },
    avatarPlaceholder: {
      backgroundColor: '#43B0A7',
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarPlaceholderText: {
      color: '#FFFFFF',
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(22),
      fontWeight: '700',
    },
    userName: {
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(16),
      fontWeight: '700',
      color: '#222',
    },
    userEmail: {
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(13),
      color: '#888',
    },
    adoptadoCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#e8f7f6',
      borderRadius: scaleSize(10),
      padding: scaleSize(12),
    },
    adoptadoLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scaleSize(10),
    },
    adoptadoIconContainer: {
      backgroundColor: '#43B0A7',
      width: scaleSize(36),
      height: scaleSize(36),
      borderRadius: scaleSize(18),
      justifyContent: 'center',
      alignItems: 'center',
    },
    adoptadoIcon: {
      width: scaleSize(20),
      height: scaleSize(20),
      resizeMode: 'contain',
      tintColor: '#FFFFFF',
    },
    adoptadoLabel: {
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(13),
      color: '#222',
      fontWeight: '600',
    },
    adoptadoNumber: {
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(12),
      color: '#888',
    },
    verBtn: {
      backgroundColor: '#43B0A7',
      paddingVertical: scaleSize(6),
      paddingHorizontal: scaleSize(18),
      borderRadius: scaleSize(20),
    },
    verBtnText: {
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(13),
      color: '#FFFFFF',
      fontWeight: '600',
    },
    menuContainer: {
      width: '100%',
      padding: scaleSize(10),
      backgroundColor: '#e8f7f6',
      borderRadius: scaleSize(5),
    },
    sectionLabel: {
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(13),
      color: '#888',
      marginBottom: scaleSize(8),
    },
    preferencesRow: {
      flexDirection: 'row',
      gap: scaleSize(20),
      marginBottom: scaleSize(10),
    },
    preferenceItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scaleSize(6),
    },
    checkbox: {
      width: scaleSize(20),
      height: scaleSize(20),
      borderWidth: 2,
      borderColor: '#43B0A7',
      borderRadius: scaleSize(4),
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkboxChecked: {
      backgroundColor: '#43B0A7',
    },
    checkmark: {
      color: '#FFFFFF',
      fontSize: scaleFont(12),
      fontWeight: '700',
      lineHeight: scaleFont(14),
    },
    preferenceLabel: {
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(14),
      color: '#222',
    },
    localidad: {
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(13),
      color: '#888',
    },
    documentoBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: scaleSize(10),
      paddingHorizontal: scaleSize(14),
      paddingVertical: scaleSize(12),
      backgroundColor: '#FFFFFF',
    },
    documentoBtnText: {
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(13),
      color: '#888',
    },
    documentoIcon: {
      width: scaleSize(20),
      height: scaleSize(20),
      resizeMode: 'contain',
      tintColor: '#43B0A7',
    },
    logo: {
      alignSelf: 'center',
      marginBottom: insets.bottom + scaleSize(50),
    },
  });
