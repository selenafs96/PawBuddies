import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    Image,
    ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';

export default function LocalizacionScreen({ onVolver, onSiguiente }) {
    const { width } = useWindowDimensions();
    const scale = width / 375;
    const scaleFont = (size) => size * scale;
    const scaleSize = (size) => size * scale;

    const [inputValue, setInputValue] = useState(''); // Lo que el usuario escribe
    const [tags, setTags] = useState([]); // Inicia vacío
    const [distancia, setDistancia] = useState(23);

    // Función para añadir el tag al pulsar Enter
    const handleAddTag = () => {
        const trimmedValue = inputValue.trim();
        if (trimmedValue !== '') {
            // Evitamos duplicados
            if (!tags.includes(trimmedValue)) {
                setTags([...tags, trimmedValue]);
            }
            setInputValue(''); // Limpiamos el input
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleSiguiente = () => {
        // Preparamos el objeto con la información recolectada
        const datosLocalizacion = {
            ciudades: tags,        // Array de strings: ["Barcelona", "08030"]
            radioKm: distancia,    // Number: 23
        };

        // Validamos que al menos haya una ubicación (opcional)
        if (tags.length === 0) {
            alert("Por favor, introduce al menos una ciudad o código postal.");
            return;
        }

        // Enviamos los datos a la función que maneja la navegación
        onSiguiente(datosLocalizacion);
    };

    // ... en el botón Siguiente ...
    <TouchableOpacity style={styles.btnSiguiente} onPress={handleSiguiente}>
        <Text style={styles.btnTextSiguiente}>Siguiente</Text>
    </TouchableOpacity>

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
            marginBottom: scaleSize(8),
        },
        label: {
            fontFamily: 'TiltNeon',
            fontSize: scaleFont(14),
            color: '#666666',
            marginBottom: scaleSize(12),
        },
        searchContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#222222',
            borderRadius: scaleSize(10),
            paddingHorizontal: scaleSize(12),
            height: scaleSize(45),
            marginBottom: scaleSize(15),
        },
        searchIcon: {
            width: scaleSize(18),
            height: scaleSize(18),
            tintColor: '#999',
            marginRight: scaleSize(8),
        },
        input: {
            flex: 1,
            fontFamily: 'TiltNeon',
            fontSize: scaleFont(14),
            color: '#222',
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
            fontSize: scaleFont(14),
            marginRight: scaleSize(6),
        },
        tagClose: {
            color: '#FFFFFF',
            fontSize: scaleFont(14),
            fontWeight: 'bold',
        },
        sliderValue: {
            fontFamily: 'TiltNeon',
            fontSize: scaleFont(18),
            color: '#222',
            marginTop: scaleSize(10),
        },
        slider: {
            width: '100%',
            height: scaleSize(40),
        },
        footer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: scaleSize(30),
            marginTop: 'auto', // Empuja el footer al final
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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    {/* Progress Bar */}
                    <View style={styles.progressContainer}>
                        <View style={[styles.progressBar, styles.progressActive]} />
                        <View style={[styles.progressBar, styles.progressActive]} />
                        <View style={[styles.progressBar, styles.progressActive]} />
                        <View style={[styles.progressBar, styles.progressInactive]} />
                    </View>

                    <Text style={styles.headerTitle}>Localización y Accesibilidad</Text>

                    {/* Sección Localización */}
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
                            value={inputValue}
                            onChangeText={setInputValue}
                            onSubmitEditing={handleAddTag} // Lógica de Enter
                            blurOnSubmit={false} // Mantiene el teclado abierto para seguir escribiendo
                            returnKeyType="done"
                        />
                    </View>

                    {/* Fila de Tags dinámicos */}
                    <View style={[
                        styles.tagsRow,
                        { marginBottom: tags.length > 0 ? scaleSize(30) : 0 } // Solo hay margen si hay contenido
                    ]}>
                        {tags.map((tag, index) => (
                            <TouchableOpacity key={index} style={styles.tag} onPress={() => removeTag(tag)}>
                                <Text style={styles.tagText}>{tag}</Text>
                                <Text style={styles.tagClose}>×</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Sección Radio */}
                    <Text style={styles.sectionTitle}>Radio</Text>
                    <Text style={styles.label}>
                        ¿Qué tan lejos estás dispuesto/a a viajar para adoptar una mascota o hacer voluntariado?
                    </Text>

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

                    {/* Footer (dentro del Scroll para que suba con el teclado si es necesario) */}
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.btnVolver} onPress={onVolver}>
                            <Text style={styles.btnTextVolver}>Volver</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnSiguiente} onPress={onSiguiente}>
                            <Text style={styles.btnTextSiguiente}>Siguiente</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}