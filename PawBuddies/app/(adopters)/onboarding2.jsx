import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { router } from 'expo-router';
import Checkbox from 'expo-checkbox';
import { useShelter } from '../../src/hooks/useShelter';
import { useRegistroUsuario } from '../../contexts/RegistroUsuarioContext';
import { scaleFont, scaleSize } from '../../src/constants/layout';
import { supabase } from '../../src/lib/supabase';

export default function TipoUsuarioScreen({ onVolver }) {
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);
  const [isAdopterChecked, setIsAdopterChecked] = useState(false);
  const [isVolunteerChecked, setIsVolunteerChecked] = useState(false);
  const [protectoraSeleccionada, setProtectoraSeleccionada] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);
  const [shelterOptions, setShelterOptions] = useState([]);

  const { actualizarDatos, datosRegistro } = useRegistroUsuario();
  const { fetchShelters, shelters } = useShelter();

  useEffect(() => {
    fetchShelters();
  }, []);

  useEffect(() => {
    if (shelters) {
      const shelterOptions = shelters.map((shelter) => ({
        label: shelter.nombre,
        value: shelter.id_protectora,
      }));
      setShelterOptions(shelterOptions);
    }
  }, [shelters]);

  const handleVolver = onVolver ?? (() => router.back());

  const handleSiguiente = () => {
    if (!tipoSeleccionado) {
      alert('Por favor, selecciona un tipo de usuario.');
      return;
    }

    if (tipoSeleccionado === 'voluntario' && !protectoraSeleccionada) {
      alert('Por favor, selecciona una protectora.');
      return;
    }

    actualizarDatos({
      rol: tipoSeleccionado,
      id_protectora:
        tipoSeleccionado === 'Voluntario' ? protectoraSeleccionada : null,
    });

    if (tipoSeleccionado === 'Voluntario') {
      router.push({
        pathname: '(adopters)/onboarding3',
        params: { tipoSeleccionado: tipoSeleccionado },
      });
      return;
    } else if (tipoSeleccionado === 'Adoptante') {
      router.push({
        pathname: '(adopters)/onboarding3',
        params: { tipoSeleccionado: tipoSeleccionado },
      });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          {/* Progress Bar — paso 2 de 4 */}
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, styles.progressActive]} />
            <View style={[styles.progressBar, styles.progressActive]} />
            <View style={[styles.progressBar, styles.progressInactive]} />
            <View style={[styles.progressBar, styles.progressInactive]} />
          </View>

          {/* Título */}
          <Text style={styles.headerTitle}>Tipo de Usuario</Text>

          {/* Subtítulo */}
          <Text style={styles.sectionTitle}>¿Qué tipo de usuario serás?</Text>
          <Text style={styles.label}>Selecciona el tipo</Text>

          {/* Opciones */}
          <View style={styles.optionsContainer}>
            <View style={styles.checkboxContainer}>
              <Checkbox
                style={[
                  styles.checkbox,
                  isAdopterChecked && styles.checkboxSelected,
                ]}
                value={isAdopterChecked}
                onValueChange={(newValue) => {
                  setIsAdopterChecked(newValue);
                  if (newValue) {
                    setIsVolunteerChecked(false); // Desmarcar el otro
                    setTipoSeleccionado('Adoptante'); // <--- GUARDAR VALOR
                  } else {
                    setTipoSeleccionado(null);
                  }
                }}
                color={isAdopterChecked ? '#3DBDB0' : undefined}
              />
              <Text style={styles.tagText}>Adoptante/Acogida</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                style={[
                  styles.checkbox,
                  isVolunteerChecked && styles.checkboxSelected,
                ]}
                value={isVolunteerChecked}
                onValueChange={(newValue) => {
                  setIsVolunteerChecked(newValue);
                  if (newValue) {
                    setIsAdopterChecked(false); // Desmarcar el otro
                    setTipoSeleccionado('Voluntario'); // <--- GUARDAR VALOR
                  } else {
                    setTipoSeleccionado(null);
                  }
                }}
                color={isVolunteerChecked ? '#3DBDB0' : undefined}
              />
              <Text style={styles.tagText}>Voluntario</Text>
            </View>
            {isVolunteerChecked && (
              <View style={styles.dropdownContainer}>
                <Text style={styles.label}>Selecciona la protectora</Text>
                <Dropdown
                  style={[
                    styles.dropdown,
                    isFocus && { borderColor: '#3DBDB0' },
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  data={shelterOptions}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? 'Selecciona una...' : '...'}
                  searchPlaceholder="Buscar..."
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setValue(item.value);
                    setProtectoraSeleccionada(item.value);
                    setIsFocus(false);
                  }}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Footer fijo en la parte inferior */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.btnVolver} onPress={handleVolver}>
          <Text style={styles.btnTextVolver}>Volver</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSiguiente} onPress={handleSiguiente}>
          <Text style={styles.btnTextSiguiente}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    marginBottom: scaleSize(30),
  },
  progressBar: {
    height: scaleSize(6),
    borderRadius: scaleSize(3),
    width: '23%',
  },

  progressActive: { backgroundColor: '#3DBDB0' },
  progressInactive: { backgroundColor: '#E0E0E0' },

  headerTitle: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(24),
    color: '#3DBDB0',
    fontWeight: '600',
    marginBottom: scaleSize(30),
  },
  sectionTitle: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(16),
    fontWeight: '700',
    color: '#222222',
    marginBottom: scaleSize(4),
  },
  label: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(14),
    color: '#666666',
    marginBottom: scaleSize(20),
  },
  optionsContainer: {
    gap: scaleSize(16),
    marginBottom: scaleSize(20),
  },
  checkbox: {
    width: scaleSize(22),
    height: scaleSize(22),
    borderColor: '#222222',
    borderRadius: scaleSize(4),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxSelected: {
    backgroundColor: '#3DBDB0',
    borderColor: '#3DBDB0',
  },
  optionLabel: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(16),
    color: '#222222',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scaleSize(25),
    paddingVertical: scaleSize(20),
    paddingBottom: scaleSize(34),
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0,
  },
  btnVolver: {
    flex: 1,
    backgroundColor: '#E8F8F5',
    paddingVertical: scaleSize(14),
    borderRadius: scaleSize(12),
    marginRight: scaleSize(15),
    alignItems: 'center',
  },
  btnSiguiente: {
    flex: 1,
    backgroundColor: '#3DBDB0',
    paddingVertical: scaleSize(14),
    borderRadius: scaleSize(12),
    alignItems: 'center',
  },
  btnTextVolver: {
    fontFamily: 'TiltNeon',
    color: '#3DBDB0',
    fontSize: scaleFont(16),
    fontWeight: '600',
  },
  btnTextSiguiente: {
    fontFamily: 'TiltNeon',
    color: '#FFFFFF',
    fontSize: scaleFont(16),
    fontWeight: '600',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: scaleSize(10),
    marginBottom: scaleSize(10),
  },
  tagText: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(18),
    fontWeight: '400',
  },
});
