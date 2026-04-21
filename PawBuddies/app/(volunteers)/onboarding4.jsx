import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { scaleFont, scaleSize } from '../../src/constants/layout';

const DISPONIBILIDAD = ['Días laborables', 'Fines de semana', 'Festivos'];
const HABILIDADES = ['Adiestramiento de animales', 'Organización de eventos', 'Recaudación de fondos'];

function Checkbox({ label, checked, onPress }) {
  return (
    <TouchableOpacity style={styles.checkRow} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={styles.checkLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function VolunteerOnboarding3() {
  const [disponibilidad, setDisponibilidad] = useState([]);
  const [habilidades, setHabilidades] = useState([]);

  const toggle = (list, setList, value) => {
    setList((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleRegistrar = () => {
    if (disponibilidad.length === 0) {
      alert('Selecciona al menos una opción de disponibilidad.');
      return;
    }
    // Aquí irá la llamada a Supabase para registrar al trabajador
    // con los datos recogidos en los 3 pasos del onboarding
    router.push('/');
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>

        {/* Progress bar — todos activos (paso 3 de 3) */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, styles.progressActive]} />
          <View style={[styles.progressBar, styles.progressActive]} />
          <View style={[styles.progressBar, styles.progressActive]} />
        </View>

        <Text style={styles.headerTitle}>Trabajador/Voluntario</Text>

        {/* Disponibilidad */}
        <Text style={styles.sectionTitle}>Disponibilidad</Text>
        <Text style={styles.label}>
          ¿Cuándo estás disponible para hacer voluntariado?{'\n'}
          (Marca todas las opciones que correspondan)
        </Text>
        {DISPONIBILIDAD.map((item) => (
          <Checkbox
            key={item}
            label={item}
            checked={disponibilidad.includes(item)}
            onPress={() => toggle(disponibilidad, setDisponibilidad, item)}
          />
        ))}

        {/* Habilidades e intereses */}
        <Text style={[styles.sectionTitle, { marginTop: scaleSize(22) }]}>
          Habilidades e intereses
        </Text>
        <Text style={styles.label}>
          ¿Tienes alguna habilidad o interés específico que pueda ayudar? (por ejemplo,
          adiestramiento de animales, organización de eventos, recaudación de fondos)
        </Text>
        {HABILIDADES.map((item) => (
          <Checkbox
            key={item}
            label={item}
            checked={habilidades.includes(item)}
            onPress={() => toggle(habilidades, setHabilidades, item)}
          />
        ))}

        {/* Footer */}
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
          <TouchableOpacity style={styles.btnRegistrar} onPress={handleRegistrar}>
            <Text style={styles.btnTextRegistrar}>Registrar</Text>
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
    marginBottom: scaleSize(14),
    lineHeight: scaleFont(19),
  },
  // ── Checkbox ──
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleSize(14),
  },
  checkbox: {
    width: scaleSize(20),
    height: scaleSize(20),
    borderWidth: 1.5,
    borderColor: '#CCCCCC',
    borderRadius: scaleSize(4),
    marginRight: scaleSize(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#3DBDB0',
    borderColor: '#3DBDB0',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: scaleFont(12),
    fontWeight: 'bold',
  },
  checkLabel: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(14),
    color: '#222222',
  },
  // ── Footer ──
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
  btnRegistrar: {
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
  btnTextRegistrar: {
    fontFamily: 'TiltNeon',
    color: '#FFFFFF',
    fontSize: scaleFont(15),
    fontWeight: '600',
  },
});