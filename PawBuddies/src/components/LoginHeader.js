import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function LoginHeader() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Native StatusBar */}
      <StatusBar
        barStyle="light-content"
        backgroundColor="#43B0A7"
        translucent={false}
      />
    <View style={styles.logoContainer}>
        <Image 
        source={require('../../assets/icons/logo_principal.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
      </View>
      <Text style={styles.title}>PAWBUDDIES</Text>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#43B0A7',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 40,
  },
  logoContainer: {
    width: 124,
    height: 166,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25,
  },
  logo: {
    width: 124,
    height: 166,
  },
  logoPlaceholder: {
    fontSize: 100,
  },
  title: {
    fontFamily: 'TiltNeon',
    fontSize: 22,
    fontWeight: '400',
    lineHeight: 28,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 15,
  },
});