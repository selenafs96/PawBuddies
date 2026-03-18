import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { supabase } from './lib/supabase.js'
import { useEffect, useState } from 'react';

export default function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData()
  }, []);

  async function fetchData() {
    const {data: result, error} = await supabase.from('protectora').select('*');
    if (error) {
      console.log(error);
    } else {
      setData(result);
    }
  }
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});