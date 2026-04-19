import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scaleFont, scaleSize } from '../../src/constants/layout';
import ScreenHeader from '../../src/components/ScreenHeader';
import { useUsers } from '../../src/hooks/useUsers';
import { useEffect } from 'react';

export default function RegistroAdoptantesScreen() {

  // 🔹 Datos de prueba (luego irá Supabase)
  const insets = useSafeAreaInsets();
  const { users, loading, error, fetchUsers } = useUsers();
  const adoptantes = users?.filter(user => user.rol === 'Adoptante');

  useEffect(() => {fetchUsers();}, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        
        {/* Imagen */}
        <View style={styles.imageWrapper}>
          <Image
            source={
              item.url_foto
                ? { uri: item.url_foto }
                : require('../../assets/icons/Logo.png')
            }
            style={styles.imagen}
          />

          {/* Botón X */}
          <TouchableOpacity style={styles.deleteBtn}>
            <Text style={styles.deleteBtnText}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Info */}
        <View style={styles.infoBox}>
          <View style={styles.row}>
            <View>
              <Text style={styles.cardNombre}>{item.nombre ?? 'Sin nombre'}</Text>
              <Text style={styles.cardCiudad}>{item.localidad_preferida ?? 'Sin ciudad'}</Text>
            </View>
            <TouchableOpacity style={styles.detallesBtn}>
              <Text style={styles.detallesText}>Detalles</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>

      {/* Header */}
      <View style={styles.titleContainer}>
        <ScreenHeader title="Registro de adoptantes" />
      </View>

      {/* Lista */}
      <View style={styles.listContainer}>
        {loading ? (
            <Text style={{ color: '#fff', textAlign: 'center' }}>Cargando...</Text>
          ) : error ? (
            <Text style={{ color: '#fff', textAlign: 'center' }}>Error al cargar</Text>
          ) : (
            <FlatList
              data={adoptantes}
              renderItem={renderItem}
              keyExtractor={(item) => item.id_usuario.toString()}
              showsVerticalScrollIndicator={false}
            />
          )}
      </View>

      {/* Barra Guardar fija */}
      <Pressable style={[styles.saveBar, { paddingBottom: insets.bottom > 0 ? insets.bottom : scaleSize(16) }]}>
        <Text style={styles.saveText}>Guardar</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  titleContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: scaleSize(8),
    marginTop: scaleSize(5),
  },

  listContainer: {
    flex: 1,
    backgroundColor: '#3DBDB0',
    borderTopLeftRadius: scaleSize(14),
    borderTopRightRadius: scaleSize(14),
    padding: scaleSize(12),
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: scaleSize(12),
    marginBottom: scaleSize(12),
    overflow: 'hidden',
  },

  imageWrapper: {
    position: 'relative',
  },

  imagen: {
    width: '100%',
    height: scaleSize(150),
    borderTopLeftRadius: scaleSize(12),
    borderTopRightRadius: scaleSize(12),
  },

  deleteBtn: {
    position: 'absolute',
    top: scaleSize(8),
    right: scaleSize(8),
    backgroundColor: '#C2185B',
    borderRadius: scaleSize(6),
    width: scaleSize(26),
    height: scaleSize(26),
    alignItems: 'center',
    justifyContent: 'center',
  },

  deleteBtnText: {
    color: '#FFFFFF',
    fontSize: scaleFont(12),
    fontWeight: 'bold',
  },

  infoBox: {
    backgroundColor: '#F2F2F2',
    padding: scaleSize(12),
    borderBottomLeftRadius: scaleSize(12),
    borderBottomRightRadius: scaleSize(12),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cardNombre: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(14),
    fontWeight: '600',
    color: '#222',
  },

  cardCiudad: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(12),
    color: '#888',
  },

  detallesBtn: {
    backgroundColor: '#3DBDB0',
    borderRadius: scaleSize(30),
    paddingHorizontal: scaleSize(14),
    paddingVertical: scaleSize(5),
    alignSelf: 'flex-start',
  },

  detallesText: {
    color: '#FFFFFF',
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(12),
    fontWeight: '600',
  },
  saveBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  saveText: {
    backgroundColor: '#FFFFFF',
    color: '#3DBDB0',
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(16),
    paddingHorizontal: scaleSize(40),
    paddingVertical: scaleSize(12),
    borderRadius: scaleSize(30),
  },
});