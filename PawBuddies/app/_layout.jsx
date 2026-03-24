import { View, Text } from 'react-native';
import { Slot } from 'expo-router';

const RootLayout = () => {
  return (
    <View>
      <Text>_layout</Text>
      <Slot />
    </View>
  )
}

export default RootLayout;