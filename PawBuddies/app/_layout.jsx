import { Text } from 'react-native';
import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
        <Text>_layout</Text>
        <Slot />
    </SafeAreaProvider>
  );
};

export default RootLayout;
