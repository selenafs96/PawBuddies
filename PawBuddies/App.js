import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { AdoptableAnimalDetail } from './src/screens/AdoptableAnimalDetail.js';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <AdoptableAnimalDetail />
      </View>
    </SafeAreaProvider>
  );
}
