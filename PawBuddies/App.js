import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { AdoptableAnimalDetail } from './src/screens/AdoptableAnimalDetail.js';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

export default function App() {

  const [fontsLoaded] = useFonts({
    TiltNeon: require('./assets/fonts/TiltNeon-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    //No borrar el SafeAreaProvider, envolver siempre toda la App con este elemento
    <SafeAreaProvider>
      <View style={{ flex: 1, maxWidth:500 }}>
        <StatusBar style='auto'/>
        <AdoptableAnimalDetail />
      </View>
    </SafeAreaProvider>
  );
}
