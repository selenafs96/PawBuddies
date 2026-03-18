import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import AdoptaScreen from './src/screens/AdoptaScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    TiltNeon: require('./assets/fonts/TiltNeon-Regular.ttf'),
  });

  if (!fontsLoaded) return null;

  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.style = {
    ...(Text.defaultProps.style || {}),
    fontFamily: 'TiltNeon',
  };

  return (
    <View style={styles.container}>
      <AdoptaScreen />
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
