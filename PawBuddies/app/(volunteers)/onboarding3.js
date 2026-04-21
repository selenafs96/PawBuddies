import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { router } from 'expo-router';
import { scaleFont, scaleSize } from '../../src/constants/layout';
import { useRegistroUsuario } from '../../contexts/RegistroUsuarioContext';

export default function VolunteerOnboarding2() {
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState([]);
  const [distancia, setDistancia] = useState(23);

  const { actualizarDatos } = useRegistroUsuario();

  const handleAddTag = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue !== '' && !tags.includes(trimmedValue)) {
      setTags([...tags, trimmedValue]);
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSiguiente = () => {
    if (tags.length === 0) {
      alert('Por favor, introduce al menos una ciudad o código postal.');
      return;
    }

    actualizarDatos({
      localidad_preferida: tags.join(', '),
      radio_maximo_km: distancia,
    });

    router.push('/(volunteers)/onboarding4');
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>

        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, styles.progressActive]} />
          <View style={[styles.progressBar, styles.progressActive]} />
          <View style={[styles.progressBar, styles.progressInactive]} />
        </View>

        <Text style={styles.headerTitle}>Localización y Accesibilidad</Text>

        <Text style={styles.sectionTitle}>Localización</Text>
        <Text style={styles.label}>¿Dónde estás localizado?</Text>

        <View style={styles.searchContainer}>
          <Image
            source={require('../../assets/icons/search.png')}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Ciudad/Código Postal"
            placeholderTextColor="#999999"
            value={inputValue}
            onChangeText={setInputValue}
            onSubmitEditing={handleAddTag}
            blurOnSubmit={false}
            returnKeyType="done"
          />
        </View>

        <View style={[styles.tagsRow, { marginBottom: tags.length > 0 ? scaleSize(20) : 0 }]}>
          {tags.map((tag, index) => (
            <TouchableOpacity key={index} style={styles.tag} onPress={() => removeTag(tag)}>
              <Text style={styles.tagText}>{tag}</Text>
              <Text style={styles.tagClose}>×</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Radio</Text>
        <Text style={styles.label}>¿Qué tan lejos estás dispuesto/a a viajar?</Text>

        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          step={1}
          value={distancia}
          onValueChange={setDistancia}
          minimumTrackTintColor="#3DBDB0"
          maximumTrackTintColor="#999999"
          thumbTintColor="#3DBDB0"
        />
        <Text style={styles.sliderValue}>{distancia} K.m</Text>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.btnVolver}
            onPress={() => {
              if (router.canGoBack()) router.back();
              else router.push('/');
            }}
          >
            <Text style={styles.btnTextVolver}>Volver</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSiguiente} onPress={handleSiguiente}>
            <Text style={styles.btnTextSiguiente}>Siguiente</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: scaleSize(25),
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scaleSize(20),
    marginBottom: scaleSize(24),
  },
  progressBar: {
    height: scaleSize(6),
    borderRadius: scaleSize(3),
    width: '31%',
  },
  progressActive: { backgroundColor: '#3DBDB0' },
  progressInactive: { backgroundColor: '#E0E0E0' },
  headerTitle: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(20),
    color: '#3DBDB0',
    fontWeight: '600',
    marginBottom: scaleSize(22),
  },
  sectionTitle: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(15),
    fontWeight: '700',
    color: '#222222',
    marginBottom: scaleSize(6),
  },
  label: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(13),
    color: '#666666',
    marginBottom: scaleSize(10),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: scaleSize(10),
    paddingHorizontal: scaleSize(12),
    height: scaleSize(42),
    marginBottom: scaleSize(14),
  },
  searchIcon: {
    width: scaleSize(16),
    height: scaleSize(16),
    tintColor: '#999',
    marginRight: scaleSize(8),
  },
  input: {
    flex: 1,
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(13),
    color: '#222',
    outlineStyle: 'none',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scaleSize(10),
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3DBDB0',
    paddingVertical: scaleSize(6),
    paddingHorizontal: scaleSize(12),
    borderRadius: scaleSize(8),
  },
  tagText: {
    color: '#FFFFFF',
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(13),
    marginRight: scaleSize(6),
  },
  tagClose: {
    color: '#FFFFFF',
    fontSize: scaleFont(14),
    fontWeight: 'bold',
  },
  sliderValue: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(16),
    color: '#222',
    marginTop: scaleSize(8),
  },
  slider: {
    width: '100%',
    height: scaleSize(40),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: scaleSize(30),
    marginTop: 'auto',
    paddingTop: scaleSize(16),
  },
  btnVolver: {
    flex: 1,
    backgroundColor: '#E8F8F5',
    paddingVertical: scaleSize(13),
    borderRadius: scaleSize(12),
    marginRight: scaleSize(15),
    alignItems: 'center',
  },
  btnSiguiente: {
    flex: 1,
    backgroundColor: '#3DBDB0',
    paddingVertical: scaleSize(13),
    borderRadius: scaleSize(12),
    alignItems: 'center',
  },
  btnTextVolver: {
    fontFamily: 'TiltNeon',
    color: '#3DBDB0',
    fontSize: scaleFont(15),
    fontWeight: '600',
  },
  btnTextSiguiente: {
    fontFamily: 'TiltNeon',
    color: '#FFFFFF',
    fontSize: scaleFont(15),
    fontWeight: '600',
  },
});