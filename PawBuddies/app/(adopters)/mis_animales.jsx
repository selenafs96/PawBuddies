import { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import AnimalCard from '../../src/components/AnimalCard';
import { supabase } from '../../src/lib/supabase';
import { scaleFont, scaleSize } from '../../src/constants/layout';
import { BottomNav } from '../../src/components/BottomNav';

export default function MisAnimales() {
  const { id_usuario } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id_usuario) fetchMisAnimales();
  }, [id_usuario]);

  const fetchMisAnimales = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Buscamos las adopciones completadas del usuario
      const { data: adopciones, error: adopcionError } = await supabase
        .from('adopcion')
        .select('id_animal')
        .eq('id_usuario', id_usuario)
        .eq('estado_adopcion', 'Aprobada');

      if (adopcionError) throw adopcionError;

      if (!adopciones || adopciones.length === 0) {
        setAnimals([]);
        return;
      }

      // 2. Recogemos los ids de los animales adoptados
      const idsAnimales = adopciones.map((a) => a.id_animal);
    

      // 3. Fetchamos los animales con esos ids
      const { data: animalesData, error: animalesError } = await supabase
        .from('animal')
        .select('id_animal, nombre, edad, url_foto')
        .in('id_animal', idsAnimales);

      if (animalesError) throw animalesError;

      setAnimals(animalesData || []);
    } catch (err) {
      console.error('Error al cargar mis animales:', err.message);
      setError('No se pudieron cargar los animales.');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <AnimalCard
      id_animal={item.id_animal}
      nombre={item.nombre}
      edad={item.edad ? `${item.edad} años` : 'Edad desconocida'}
      imagen={item.url_foto?.[0] ?? null}
    />
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <SafeAreaView style={styles.safeArea}>
        <Text style={[styles.titulo, { paddingTop: insets.top + scaleSize(14) }]}>
            Mis animales
        </Text>

        <View style={styles.container}>
          {loading ? (
            <View style={styles.centrado}>
              <ActivityIndicator size="large" color="#FFFFFF" />
            </View>
          ) : error ? (
            <View style={styles.centrado}>
              <Text style={styles.errorTexto}>{error}</Text>
            </View>
          ) : animals.length === 0 ? (
            <View style={styles.centrado}>
              <Text style={styles.errorTexto}>
                Aún no tienes animales adoptados.
              </Text>
            </View>
          ) : (
            <FlatList
              data={animals}
              renderItem={renderItem}
              keyExtractor={(item) => item.id_animal}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: scaleSize(16) }}
            />
          )}
        </View>
      </SafeAreaView>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  titulo: {
    fontFamily: 'TiltNeon',
    color: '#222222',
    fontSize: scaleFont(20),
    fontWeight: '600',
    textAlign: 'center',
    paddingBottom: scaleSize(14),
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#3DBDB0',
    borderTopLeftRadius: scaleSize(14),
    borderTopRightRadius: scaleSize(14),
    paddingHorizontal: scaleSize(25),
    paddingTop: scaleSize(12),
    paddingBottom: scaleSize(50),
  },
  centrado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorTexto: {
    fontFamily: 'TiltNeon',
    color: '#FFFFFF',
    fontSize: scaleFont(14),
    textAlign: 'center',
  },
});