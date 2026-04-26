import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  passwordError,
  setPasswordError,
}) {
  const handlePasswordChange = (text) => {
    setPassword(text);
    // Limpiar error si el usuario empieza a escribir
    if (passwordError) {
      setPasswordError('');
    }
  };

  return (
    <View style={styles.container}>
      {/* Email Section */}
      <View style={styles.emailSection}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="What's your email address"
            placeholderTextColor="#999999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <MaterialCommunityIcons
            name="email"
            size={18}
            color="#16A99F"
            style={styles.icon}
          />
        </View>
      </View>

      {/* Password Section */}
      <View style={styles.passwordSection}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, passwordError && styles.inputError]}
            placeholder="••••••••••"
            placeholderTextColor={passwordError ? '#BE1447' : '#999999'}
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity 
            onPress={() => setShowPassword(!showPassword)}
            style={styles.iconButton}
          >
            <MaterialCommunityIcons
              name={showPassword ? 'eye' : 'eye-off'}
              size={18}
              color={passwordError ? '#BE1447' : '#16A99F'}
            />
          </TouchableOpacity>
        </View>

        {/* Password Error Message */}
        {!!passwordError && (
          <Text style={styles.errorText}>
            Password will be greater than 6 digit.
          </Text>
        )}
      </View>

      {/* Forgot Password Link */}
      <TouchableOpacity style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPassword}>¿Olvidaste la contraseña?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 343,
    alignSelf: 'center',
    marginTop: 30,
    gap: 15,
  },
  emailSection: {
    width: 343,
    gap: 8,
  },
  passwordSection: {
    width: 343,
    gap: 8,
  },
  label: {
    fontFamily: 'TiltNeon',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    color: '#FFFFFF',
  },
  inputContainer: {
    width: 343,
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 9,
  },
  input: {
    flex: 1,
    fontFamily: 'TiltNeon',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    color: '#000000',
    padding: 0,
  },
  inputError: {
    color: '#BE1447',
  },
  iconButton: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontFamily: 'TiltNeon',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 15,
    color: '#BE1447',
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: 5,
  },
  forgotPassword: {
    fontFamily: 'TiltNeon',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    color: '#FFFFFF',
  },
});