import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Animated,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useFavoritos } from '../../src/hooks/useFavoritos';
import { BackButton } from '../../src/components/BackButton';
import { supabase } from '../../src/lib/supabase';
import { router, useLocalSearchParams } from 'expo-router';

export default function AdoptaConfirmScreen() {

  const { idAnimalPreseleccionado } = useLocalSearchParams();

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

  const { animalesFavoritos, loading, eliminarFavorito, fetchFavoritos } = useFavoritos();

  const [busqueda, setBusqueda] = useState('');
  const [seleccionAdoptar, setSeleccionAdoptar] = useState(
    idAnimalPreseleccionado ? { [idAnimalPreseleccionado]: true } : {},
  );
  const [mostrarConfirm, setMostrarConfirm] = useState(
    !!idAnimalPreseleccionado,
  );
  const [isSheetVisible, setIsSheetVisible] = useState(
    !!idAnimalPreseleccionado,
  );
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState(null);

  const bottomSheetAnim = useRef(
    new Animated.Value(idAnimalPreseleccionado ? 1 : 0),
  ).current;

  useEffect(() => {
    if (mostrarConfirm) {
      setIsSheetVisible(true);
      Animated.timing(bottomSheetAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(bottomSheetAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) setIsSheetVisible(false);
      });
    }
  }, [mostrarConfirm]);

  async function enviarSolicitudes() {
    const { supabase } = await import('../../src/lib/supabase');
    const ids = Object.entries(seleccionAdoptar)
      .filter(([_, v]) => v)
      .map(([id]) => id);
    if (!ids.length) return;
    setEnviando(true);
    const solicitudes = ids.map((id_animal) => ({
      estado_adopcion: 'Solicitada',
      fecha_adopcion: new Date().toISOString().split('T')[0],
      id_usuario: userId,
      id_animal,
    }));
    const { error } = await supabase.from('adopcion').insert(solicitudes);
    setEnviando(false);
    if (error) setError('Error al enviar: ' + error.message);
    else {
      setSeleccionAdoptar({});
      setMostrarConfirm(false);
      router.push({
          pathname: '/confirmation',
          params: { message: '¡Solicitud enviada!' },
        })
    }
  }

  const tieneSeleccion = (sel) => Object.values(sel).some(Boolean);

  const toggleAdoptar = (id) => {
    setSeleccionAdoptar((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      setMostrarConfirm(tieneSeleccion(next));
      return next;
    });
  };

  // Papelera — elimina los animales seleccionados de favoritos
  const eliminarSeleccionados = async () => {
    const ids = Object.entries(seleccionAdoptar)
      .filter(([_, v]) => v)
      .map(([id]) => id);
    for (const id of ids) {
      await eliminarFavorito(id);
    }
    setSeleccionAdoptar({});
    setMostrarConfirm(false);
  };

  useEffect(() => {
    fetchFavoritos(userId);
  }, [userId, idAnimalPreseleccionado])

  const animalesFiltrados = animalesFavoritos.filter((a) =>
    a.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );

  const renderItem = ({ item }) => {
    const adoptado = seleccionAdoptar[item.id_animal];
    const imagen = item.url_foto?.[0] ?? null;

    return (
      <View style={styles.animalRow}>
        <Image
          source={
            imagen ? { uri: imagen } : require('../../assets/icons/Logo.png')
          }
          style={styles.animalFoto}
        />
        <View style={styles.animalInfo}>
          <Text style={styles.animalNombre}>{item.nombre}</Text>
          <Text
            style={adoptado ? styles.animalSolicitado : styles.animalEstado}
          >
            {adoptado ? '✓ Solicitar adopción' : '¿Solicitar adopción?'}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.radioBtn}
          onPress={() => toggleAdoptar(item.id_animal)}
        >
          <View
            style={[styles.radioOuter, adoptado && styles.radioOuterActivo]}
          >
            {adoptado && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.safeArea}>
        {/* HEADER */}
        <View style={styles.header}>
          <BackButton />
          <Text style={styles.titulo}>¿Quieres adoptar?</Text>
          <TouchableOpacity
            style={{
              opacity: tieneSeleccion(seleccionAdoptar) ? 1 : 0.3,
            }}
            onPress={eliminarSeleccionados}
            disabled={!tieneSeleccion(seleccionAdoptar)}
          >
            <Image
              source={require('../../assets/icons/iconoPapelera.png')}
              style={styles.iconoPapelera}
            />
          </TouchableOpacity>
        </View>

        {/* BUSCADOR */}
        <View style={styles.filtrosRow}>
          <View style={styles.buscadorDentro}>
            <Image
              source={require('../../assets/icons/search.png')}
              style={styles.buscadorIcono}
            />
            <TextInput
              style={styles.buscadorInput}
              placeholder="Busca por el nombre"
              placeholderTextColor="#999"
              value={busqueda}
              onChangeText={setBusqueda}
            />
          </View>
        </View>

        {/* CONTENIDO */}
        {loading ? ( //TODO quitar negacion
          <View style={styles.centrado}>
            <ActivityIndicator size="large" color="#3DBDB0" />
          </View>
        ) : error ? (
          <View style={styles.centrado}>
            <Text style={{ color: 'red' }}>{error}</Text>
          </View>
        ) : animalesFiltrados.length === 0 ? (
          <View style={styles.centrado}>
            <Text style={{ color: '#999', fontFamily: 'TiltNeon' }}>
              No tienes animales guardados
            </Text>
          </View>
        ) : (
          <FlatList
            data={animalesFiltrados}
            renderItem={renderItem}
            keyExtractor={(item) => item.id_animal}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.lista}
            ListFooterComponent={<View style={{ height: 180 }} />}
          />
        )}
      </View>

      {/* BOTTOM SHEET */}
      {isSheetVisible && (
        <Animated.View
          style={[
            styles.bottomSheet,
            {
              opacity: bottomSheetAnim,
              transform: [
                {
                  translateY: bottomSheetAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [120, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.bottomSheetLinea} />
          <Text style={styles.bottomSheetTexto}>
            ¿Quieres enviar una solicitud de adopción?
          </Text>
          <View style={styles.bottomSheetBotones}>
            <TouchableOpacity
              style={[styles.btnEnviar, enviando && { opacity: 0.6 }]}
              onPress={enviarSolicitudes}
              disabled={enviando}
            >
              {enviando ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.btnEnviarTexto}>Enviar</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnAnular}
              onPress={() => {
                setSeleccionAdoptar({});
                setMostrarConfirm(false);
              }}
            >
              <Text style={styles.btnAnularTexto}>Anular</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#FFFFFF' },
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  centrado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    position: 'relative',
  },
  titulo: {
    fontFamily: 'TiltNeon',
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
  },
  iconoPapelera: {
    width: 24,
    height: 24,
    tintColor: '#222',
  },
  buscadorIcono: {
    width: 16,
    height: 16,
    marginRight: 8,
    resizeMode: 'contain',
    tintColor: '#999',
  },
  buscadorInput: {
    fontFamily: 'TiltNeon',
    flex: 1,
    fontSize: 15,
    color: '#222',
  },
  buscadorDentro: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  filtrosRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    backgroundColor: '#E8F8F5',
    borderRadius: 12,
    padding: 8,
    marginBottom: 8,
  },
  lista: { paddingHorizontal: 20 },
  animalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#EEE',
  },
  animalFoto: { width: 56, height: 56, borderRadius: 28, marginRight: 12 },
  animalInfo: { flex: 1 },
  animalNombre: {
    fontFamily: 'TiltNeon',
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  animalEstado: {
    fontFamily: 'TiltNeon',
    fontSize: 13,
    color: '#999',
    marginTop: 2,
  },
  animalSolicitado: {
    fontFamily: 'TiltNeon',
    fontSize: 13,
    color: '#3DBDB0',
    marginTop: 2,
    fontWeight: '500',
  },
  radioBtn: { padding: 4 },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CCC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActivo: { borderColor: '#3DBDB0', backgroundColor: '#3DBDB0' },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 20,
  },
  bottomSheetLinea: {
    width: 40,
    height: 4,
    backgroundColor: '#DDD',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  bottomSheetTexto: {
    fontFamily: 'TiltNeon',
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
    marginBottom: 16,
  },
  bottomSheetBotones: { flexDirection: 'row', gap: 12 },
  btnEnviar: {
    flex: 1,
    backgroundColor: '#3DBDB0',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  btnEnviarTexto: {
    fontFamily: 'TiltNeon',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  btnAnular: {
    flex: 1,
    backgroundColor: '#E8F8F5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  btnAnularTexto: {
    fontFamily: 'TiltNeon',
    color: '#3DBDB0',
    fontSize: 16,
    fontWeight: '600',
  },
});
