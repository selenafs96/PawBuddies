import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { router } from 'expo-router';

export default function Contraseña() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleSendEmail = async () => {
    if (!email.trim()) {
      alert('Por favor, introduce tu correo electrónico');
      return;
    }

    if (!email.includes('@')) {
      alert('Por favor, introduce un correo válido');
      return;
    }

    setIsLoading(true);
    try {
      console.log('Enviando email a:', email);
      alert('Se ha enviado un enlace de recuperación a tu correo');
    } catch (error) {
      alert('Error al enviar el email. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* StatusBar */}
      <View style={[styles.statusBar, styles.borderPosition]}>
        <View style={styles.time}>
          <Text style={styles.time2}>9:41</Text>
        </View>
        <View style={styles.levels}>
          <View style={[styles.battery, styles.borderPosition]}>
            <View style={[styles.border, styles.borderBorder]} />
            <Image style={[styles.capIcon, styles.iconPosition]} resizeMode="cover" />
            <View style={[styles.capacity, styles.borderPosition]} />
          </View>
          <Image style={[styles.wifiIcon, styles.iconPosition]} resizeMode="cover" />
          <Image style={[styles.cellularConnectionIcon, styles.iconPosition]} resizeMode="cover" />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Image style={styles.backIcon} />
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.headerSection}>
          <Text style={styles.title}>¿Olvidaste la contraseña?</Text>
          <Text style={[styles.description, styles.emailTypo]}>
            Por favor, introduce la dirección de correo electrónico asociada a tu cuenta y te enviaremos instrucciones para restablecer tu contraseña.
          </Text>
        </View>

        {/* Email Input */}
        <View style={styles.emailSection}>
          <Text style={[styles.label, styles.emailTypo]}>Email</Text>
          <View style={[styles.inputWithIcon, styles.borderBorder]}>
            <TextInput
              style={[styles.input, styles.emailTypo]}
              placeholder="ejemplo@gmail.com"
              placeholderTextColor="#848484"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!isLoading}
            />
            <Image style={styles.emailIcon} />
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footerSection}>
        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleSendEmail}
          activeOpacity={0.8}
          disabled={isLoading}
        >
          <Text style={[styles.buttonText, styles.emailTypo]}>
            {isLoading ? 'Enviando...' : 'Enviar'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.emailTypo}>
          <Text style={styles.helpTextMain}>¿Necesitas ayuda? </Text>
          <Text style={styles.helpTextLink}>Soporte de contacto</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  borderPosition: {
    left: '50%',
    position: 'absolute',
  },
  borderBorder: {
    borderWidth: 1,
    borderStyle: 'solid',
  },
  iconPosition: {
    maxHeight: '100%',
    left: '50%',
    position: 'absolute',
  },
  emailTypo: {
    fontSize: 14,
    textAlign: 'left',
    fontFamily: 'TiltNeon-Regular',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  statusBar: {
    marginLeft: -196,
    top: 0,
    width: 393,
    gap: 112,
    flexDirection: 'row',
    height: 54,
  },
  time: {
    width: 138,
    height: 54,
  },
  time2: {
    width: '26.81%',
    top: '33.96%',
    left: '36.96%',
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
    fontFamily: 'SF Pro',
    color: '#202020',
    textAlign: 'center',
    position: 'absolute',
  },
  levels: {
    width: 143,
    height: 54,
  },
  battery: {
    height: '24.07%',
    marginLeft: 12,
    top: '42.59%',
    bottom: '33.33%',
    width: 27,
  },
  border: {
    height: '100%',
    marginLeft: -14,
    borderRadius: 4,
    borderColor: '#202020',
    width: 25,
    opacity: 0,
    left: '50%',
    position: 'absolute',
  },
  capIcon: {
    height: '31.54%',
    marginLeft: 12,
    top: '36.78%',
    bottom: '31.68%',
    width: 1,
    opacity: 0,
  },
  capacity: {
    height: '69.23%',
    marginLeft: -12,
    top: '15.38%',
    bottom: '15.38%',
    backgroundColor: '#202020',
    width: 21,
    borderRadius: 3,
  },
  wifiIcon: {
    height: '22.78%',
    marginLeft: -13,
    top: '43.77%',
    bottom: '33.45%',
    width: 17,
  },
  cellularConnectionIcon: {
    height: '22.59%',
    marginLeft: -39,
    top: '43.58%',
    bottom: '33.82%',
    width: 19,
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingTop: 64,
    paddingBottom: 200,
  },
  backButton: {
    width: 24,
    height: 24,
    marginBottom: 18,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerSection: {
    gap: 5,
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontFamily: 'TiltNeon-Regular',
    fontWeight: '400',
    color: '#16A99F',
  },
  description: {
    color: '#696969',
    width: 343,
  },
  emailSection: {
    gap: 8,
  },
  label: {
    color: '#000',
  },
  inputWithIcon: {
    width: 343,
    height: 42,
    borderColor: '#848484',
    padding: 12,
    gap: 10,
    alignItems: 'center',
    borderRadius: 3,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    color: '#000',
    padding: 0,
  },
  emailIcon: {
    height: 18,
    width: 18,
  },
  footerSection: {
    position: 'absolute',
    bottom: 24,
    left: 25,
    right: 25,
    gap: 16,
    alignItems: 'center',
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#16A99F',
    paddingHorizontal: 12,
    paddingVertical: 14,
    alignItems: 'center',
    width: 343,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  helpTextMain: {
    color: '#000',
  },
  helpTextLink: {
    color: '#16A99F',
    textTransform: 'capitalize',
  },
});