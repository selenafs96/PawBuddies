import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { supabase } from './lib/supabase.js';
import { useEffect, useState } from 'react';
import { AdoptableAnimalDetail } from './src/screens/AdoptableAnimalDetail.js';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data: result, error } = await supabase
      .from('protectora')
      .select('*');
    if (error) {
      console.log(error);
    } else {
      setData(result);
    }

    //Ejemplo fetching de datos:
    {
      /* <View style={styles.container}>
        {data.map((item, index) => (
          <Text key={item.id_protectora}>{item.nombre}: {item.presentacion}</Text>
        ))}
        <StatusBar style="auto" />
      </View> */
    }
  }
  return (
    <SafeAreaProvider>
      <View>
        <StatusBar style="auto" />
        <AdoptableAnimalDetail />
      </View>
    </SafeAreaProvider>
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
