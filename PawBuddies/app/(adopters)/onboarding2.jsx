import { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { useRegistroUsuario } from '../../contexts/RegistroUsuarioContext';
import { router } from 'expo-router';
import { scaleFont, scaleSize } from '../../src/constants/layout';

const TIPOS_USUARIO = [
    { rol: 'adoptante', label: 'Adoptante/Acogida' },
    { rol: 'voluntario', label: 'Voluntario' },
];

export default function TipoUsuarioScreen({ onVolver }) {

    const handleVolver = onVolver ?? (() => router.back());
    const [tipoSeleccionado, setTipoSeleccionado] = useState(null);
    const { actualizarDatos, datosRegistro } = useRegistroUsuario();

    const handleSiguiente = () => {
        if (!tipoSeleccionado) {
            alert('Por favor, selecciona un tipo de usuario.');
            return;
        }
        actualizarDatos({ tipo_usuario: tipoSeleccionado });
        // Navega a la siguiente (onboarding3)
        router.push('(adopters)/onboarding3');
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
                        {TIPOS_USUARIO.map((tipo) => {
                            const isSelected = tipoSeleccionado === tipo.rol;
                            return (
                                <TouchableOpacity
                                    key={tipo.rol}
                                    style={styles.optionRow}
                                    onPress={() => setTipoSeleccionado(tipo.rol)}
                                    activeOpacity={0.7}
                                >
                                    {/* Checkbox */}
                                    <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                                        {isSelected && <Text style={styles.checkmark}>✓</Text>}
                                    </View>
                                    <Text style={styles.optionLabel}>{tipo.label}</Text>
                                </TouchableOpacity>
                            );
                        })}
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
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scaleSize(12),
    },
    checkbox: {
        width: scaleSize(22),
        height: scaleSize(22),
        borderWidth: 2,
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
    checkmark: {
        color: '#FFFFFF',
        fontSize: scaleFont(13),
        fontWeight: 'bold',
        lineHeight: scaleFont(16),
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
});
