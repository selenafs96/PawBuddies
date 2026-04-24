import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { scaleFont, scaleSize } from '../../src/constants/layout';
import { useRegistroUsuario } from '../../contexts/RegistroUsuarioContext';
import { supabase } from '../../src/lib/supabase';
import { useUsers } from '../../src/hooks/useUsers';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const DISPONIBILIDAD = ['Días laborables', 'Fines de semana', 'Festivos'];
const HABILIDADES = [
  'Adiestramiento de animales',
  'Organización de eventos',
  'Recaudación de fondos',
];

function Checkbox({ label, checked, onPress }) {
  return (
    <TouchableOpacity
      style={styles.checkRow}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={styles.checkLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function VolunteerOnboarding3() {
  const { origenRegistro } = useLocalSearchParams();
  const [disponibilidad, setDisponibilidad] = useState([]);
  const [habilidades, setHabilidades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const cargarDatosSesion = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user?.id) {
        await fetchUserById(session.user.id);
        setIsLogged(true);
      }
    };
    cargarDatosSesion();
    
  }, []);

  const { datosRegistro, resetearDatos } = useRegistroUsuario();
  const { createUser, fetchUserById, users } = useUsers();

  const toggle = (list, setList, value) => {
    setList((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  const handleRegistrar = async () => {
    if (disponibilidad.length === 0) {
      alert('Selecciona al menos una opción de disponibilidad.');
      return;
    }

    setLoading(true);

    try {
      // 1. Crear un cliente temporal "fantasma" que NO guarda sesión
      const tempSupabase = createClient(
        process.env.EXPO_PUBLIC_SUPABASE_URL,
        process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
        {
          auth: {
            persistSession: false, // CRÍTICO: No guarda el token en el dispositivo
            autoRefreshToken: false,
            detectSessionInUrl: false,
            storage: {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            },
          },
        },
      );

      // 2. Crear usuario en Auth usando el cliente temporal
      const { data: authData, error: authError } =
        await tempSupabase.auth.signUp({
          email: datosRegistro.email,
          password: datosRegistro.password,
        });

      if (authError) {
        alert('Error en el registro: ' + authError.message);
        return;
      }

      if (authData.user) {
        const perfilUsuario = {
          id_usuario: authData.user.id,
          nombre: datosRegistro.nombre,
          apellidos: datosRegistro.apellidos ?? '',
          email: datosRegistro.email,
          telefono: datosRegistro.telefono,
          url_foto: datosRegistro.url_foto ?? null,
          rol: datosRegistro.rol,
          id_protectora: isLogged ? users.id_protectora : datosRegistro.id_protectora,
          localidad_preferida: datosRegistro.localidad_preferida,
          radio_maximo_km: datosRegistro.radio_maximo_km,
          descripcion: [
            disponibilidad.length > 0
              ? 'Disponibilidad: ' + disponibilidad.join(', ')
              : '',
            habilidades.length > 0
              ? 'Habilidades: ' + habilidades.join(', ')
              : '',
          ]
            .filter(Boolean)
            .join(' | '),
          perros_propiedad: null,
          gatos_propiedad: null,
          otros_propiedad: null,
        };

        await createUser(perfilUsuario);
        resetearDatos();

        router.push({
          pathname: '/confirmation',
          params: { message: '¡Registro completado!' },
        });
      }
    } catch (err) {
      console.error('Error inesperado:', err);
      alert('Error inesperado: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, styles.progressActive]} />
          <View style={[styles.progressBar, styles.progressActive]} />
          <View style={[styles.progressBar, styles.progressActive]} />
          {origenRegistro === 'pantallaLogin' && (
            <View style={[styles.progressBar, styles.progressActive]} />
          )}
        </View>

        <Text style={styles.headerTitle}>Trabajador/Voluntario</Text>

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

        <Text style={[styles.sectionTitle, { marginTop: scaleSize(22) }]}>
          Habilidades e intereses
        </Text>
        <Text style={styles.label}>
          ¿Tienes alguna habilidad o interés específico que pueda ayudar? (por
          ejemplo, adiestramiento de animales, organización de eventos,
          recaudación de fondos)
        </Text>
        {HABILIDADES.map((item) => (
          <Checkbox
            key={item}
            label={item}
            checked={habilidades.includes(item)}
            onPress={() => toggle(habilidades, setHabilidades, item)}
          />
        ))}

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.btnVolver}
            onPress={() => {
              if (router.canGoBack()) router.back();
              else router.push('/');
            }}
            disabled={loading}
          >
            <Text style={styles.btnTextVolver}>Volver</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btnRegistrar, loading && { opacity: 0.7 }]}
            onPress={handleRegistrar}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.btnTextRegistrar}>Registrar</Text>
            )}
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
    paddingHorizontal: scaleSize(20),
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
    flex: 1,
    marginHorizontal: 5,
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
