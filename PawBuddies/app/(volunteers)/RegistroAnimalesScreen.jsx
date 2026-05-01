import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { scaleFont, scaleSize } from '../../src/constants/layout.js';
import { useAnimals } from '../../src/hooks/useAnimals';
import ScreenHeader from '../../src/components/ScreenHeader.js';
import { supabase } from '../../src/lib/supabase.js';
import { useUsers } from '../../src/hooks/useUsers.js';

export default function RegistroAnimalesScreen() {
  const [modoEliminar, setModoEliminar] = useState(false);
  const [idProtectora, setIdProtectora] = useState('');
  const [animalesMostrar, setAnimalesMostrar] = useState([]);

  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [especie, setEspecie] = useState('todos');
  const {
    animals,
    loading,
    error,
    fetchAnimalByEspecieEstado,
    deleteAnimal,
    fetchAnimalByEspecieProtectora,
  } = useAnimals();

  const { fetchUserById } = useUsers();

  useEffect(() => {
    const cargarDatosSesion = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user?.id) {
        const usuario = await fetchUserById(session.user.id);

        if (usuario) {
          setIdProtectora(usuario.id_protectora);
        }
      }
    };
    cargarDatosSesion();
  }, []);

  useEffect(() => {
    const filtrarAnimales = async () => {
      if (idProtectora) {
        let animales = await fetchAnimalByEspecieProtectora(
          especie,
          idProtectora,
        );

        setAnimalesMostrar(animales);
      }
    };

    filtrarAnimales();
  }, [especie, idProtectora]);

  const handleSave = async () => {
    try {
      const updates = {
        nombre: form.nombre,
        genero: form.genero,
        edad: parseInt(form.edad) || 0,
        tamano: form.tamano,
        presentacion: form.presentacion,
      };
      await updateAnimal(animals.id_animal, updates);
      alert('Cambios guardados');
    } catch (err) {
      alert('Error al guardar: ' + err.message);
    }
  };

  const handleDelete = async (id_animal) => {
    try {
      await deleteAnimal(id_animal);
      alert('Animal eliminado');
      await fetchAnimalByEspecieEstado(especie, 'todos');
    } catch (err) {
      alert('Error al eliminar: ' + err.message);
    }
  };

  const handleEdit = (id_animal) => {
    router.push({
      pathname: '/(animals)/EditAnimalScreen',
      params: { id_animal },
    });
  };

  const renderItem = ({ item }) => {
    const imagen = item.url_foto?.[0] ?? null;
    return (
      <View style={styles.card}>
        {/* Imagen */}
        <View style={styles.imageWrapper}>
          <Image
            source={
              imagen ? { uri: imagen } : require('../../assets/icons/Logo.png')
            }
            style={styles.imagen}
            resizeMode="cover"
          />
          {/* Botón X */}
          {modoEliminar && (
            <Pressable
              style={styles.deleteBtn}
              onPress={() => handleDelete(item.id_animal)}
            >
              <Text style={styles.deleteBtnText}>✕</Text>
            </Pressable>
          )}
        </View>

        {/* Info */}
        <View style={styles.cardInfo}>
          <View style={styles.cardTextCol}>
            <Text style={styles.cardNombre} numberOfLines={1}>
              {item.nombre}
            </Text>
            <Text style={styles.cardEdad}>
              {item.edad ? `${item.edad} años` : 'Edad desconocida'}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => handleEdit(item.id_animal)}
          >
            <Text style={styles.editBtnText}>Editar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {/* Cabecera */}
      <View style={styles.titleContainer}>
        <ScreenHeader title="Registro de animales" />
      </View>
      <View style={styles.listContainer}>
        {/* Filtros de especie */}
        <View style={styles.filtrosRow}>
          <TouchableOpacity
            style={[styles.addBtn, modoEliminar && styles.filtroBtnActivo]}
            onPress={() => { router.push('/(volunteers)/registroAnimal')}}
          >
            <Image
              source={require('../../assets/icons/add.svg')}
              style={[
                styles.addBtnIcon,
                modoEliminar && styles.filtroIconoActivo,
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity

            style={[
              styles.filtroBtn,
              especie === 'Perro' && styles.filtroBtnActivo,
            ]}
            onPress={() => setEspecie(especie === 'Perro' ? 'todos' : 'Perro')}
          >
            <Image
              source={require('../../assets/icons/Dog.png')}
              style={[
                styles.filtroIcono,
                especie === 'Perro' && styles.filtroIconoActivo,
              ]}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filtroBtn,
              especie === 'Gato' && styles.filtroBtnActivo,
            ]}
            onPress={() => setEspecie(especie === 'Gato' ? 'todos' : 'Gato')}
          >
            <Image
              source={require('../../assets/icons/Cat.png')}
              style={[
                styles.filtroIcono,
                especie === 'Gato' && styles.filtroIconoActivo,
              ]}
            />
          </TouchableOpacity>

          {/* Botón añadir animal */}
          <TouchableOpacity
            style={[styles.lapizBtn, modoEliminar && styles.filtroBtnActivo]}
            onPress={() => setModoEliminar(!modoEliminar)}
          >
            <Image
              source={require('../../assets/icons/lapiz.png')}
              style={[
                styles.lapizBtnIcon,
                modoEliminar && styles.filtroIconoActivo,
              ]}
            />
          </TouchableOpacity>
        </View>
        {/* Contenido */}
        {loading ? (
          <View style={styles.centrado}>
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
        ) : error ? (
          <View style={styles.centrado}>
            <Text style={styles.errorTexto}>Error al cargar animales</Text>
          </View>
        ) : (
          <FlatList
            data={animalesMostrar}
            renderItem={renderItem}
            keyExtractor={(item) => item.id_animal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listaContent}
            ListEmptyComponent={
              <View style={styles.centrado}>
                <Text style={styles.errorTexto}>
                  No hay animales registrados
                </Text>
              </View>
            }
          />
        )}
      </View>

      {/* Barra Guardar fija */}
      <Pressable
        style={[
          styles.saveBar,
          { paddingBottom: insets.bottom > 0 ? insets.bottom : scaleSize(16) },
        ]}
        onPress={handleSave}
      >
        <Image
          source={require('../../assets/icons/GuardarBtn.png')}
          style={styles.saveButtonImage}
          resizeMode="contain"
        />
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: scaleSize(8),
    marginTop: scaleSize(5),
    width: '100%',
    position: 'relative',
  },
  // ── Filtros ──
  filtrosRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scaleSize(10),
    paddingVertical: scaleSize(10),
  },
  filtroBtn: {
    backgroundColor: '#e8f7f6',
    padding: scaleSize(10),
    borderRadius: scaleSize(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  filtroBtnActivo: {
    backgroundColor: '#3DBDB0',
  },
  filtroIcono: {
    width: scaleSize(24),
    height: scaleSize(24),
    resizeMode: 'contain',
    tintColor: '#3DBDB0',
  },
  filtroIconoActivo: {
    tintColor: '#FFFFFF',
  },
  lapizBtn: {
    position: 'absolute',
    right: scaleSize(20),
    backgroundColor: '#e8f7f6',
    padding: scaleSize(10),
    borderRadius: scaleSize(14),
  },
  lapizBtnIcon: {
    width: scaleSize(20),
    height: scaleSize(20),
    resizeMode: 'contain',
    tintColor: '#3DBDB0',
  },
  addBtn: {
    position: 'absolute',
    left: scaleSize(20),
    backgroundColor: '#e8f7f6',
    padding: scaleSize(6),
    borderRadius: scaleSize(14),
  },
  addBtnIcon: {
    width: scaleSize(30),
    height: scaleSize(30),
    resizeMode: 'contain',
    tintColor: '#3DBDB0',
  },

  // ── Lista ──
  listContainer: {
    flex: 1,
    backgroundColor: '#3DBDB0',
    borderTopLeftRadius: scaleSize(14),
    borderTopRightRadius: scaleSize(14),
    paddingHorizontal: scaleSize(10),
    paddingTop: scaleSize(10),
    paddingBottom: scaleSize(30),
  },
  listaContent: {
    paddingBottom: scaleSize(20),
  },
  centrado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleSize(40),
  },
  errorTexto: {
    fontFamily: 'TiltNeon',
    color: '#FFFFFF',
    fontSize: scaleFont(14),
    textAlign: 'center',
  },
  // ── Card ──
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: scaleSize(12),
    overflow: 'hidden',
    flex: 1,
    margin: scaleSize(5),
  },
  imageWrapper: {
    position: 'relative',
  },
  imagen: {
    width: '100%',
    height: scaleSize(125),
  },
  deleteBtn: {
    position: 'absolute',
    top: scaleSize(6),
    right: scaleSize(6),
    backgroundColor: '#E53935',
    borderRadius: scaleSize(6),
    width: scaleSize(24),
    height: scaleSize(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteBtnText: {
    color: '#FFFFFF',
    fontSize: scaleFont(11),
    fontWeight: 'bold',
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: scaleSize(8),
  },
  cardTextCol: {
    flex: 1,
    marginRight: scaleSize(4),
  },
  cardNombre: {
    fontFamily: 'TiltNeon',
    fontWeight: '600',
    fontSize: scaleFont(14),
    color: '#222',
  },
  cardEdad: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(12),
    color: '#888',
    marginTop: scaleSize(2),
  },
  editBtn: {
    backgroundColor: '#3DBDB0',
    borderRadius: scaleSize(20),
    paddingHorizontal: scaleSize(10),
    paddingVertical: scaleSize(4),
  },
  editBtnText: {
    fontFamily: 'TiltNeon',
    color: '#FFFFFF',
    fontSize: scaleFont(11),
    fontWeight: '600',
  },
  saveBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: scaleSize(10),
    paddingHorizontal: scaleSize(20),
    alignItems: 'center',
  },
  saveButtonImage: {
    width: '100%',
    height: scaleSize(55),
  },
});
