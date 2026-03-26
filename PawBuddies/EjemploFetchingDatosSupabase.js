import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { supabase } from './lib/supabase.js'
import { useEffect, useState } from 'react';

export function EjemploFetchingDatosSupabase() {

//Estado de los datos
  const [data, setData] = useState([]);

  //Hace que se ejecute la función fetchData() la primera vez que se renderiza el componente
  useEffect(() => {
    fetchData()
  }, []);

  //Función que recupera los datos de la base de datos
  async function fetchData() {
    const {data: result, error} = await supabase.from('protectora').select('*');
    if (error) {
      console.log(error);
    } else {
      setData(result);
    }
  }

  //Se imprimen el nombre y la presentación de todas las proetctoras que haya en la base de datos
  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <Text key={item.id_protectora}>{item.nombre}: {item.presentacion}</Text>
      ))}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});