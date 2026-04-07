import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    ScrollView,
    TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

// Importaciones de tus constantes de escalado
import { scaleFont, scaleSize } from '../../src/constants/layout.js';
import { AnimalImagesCarousel } from '../../src/components/AnimalImagesCarousel.js';
import { DataCard } from '../../src/components/DataCard.js';
import { BackButton } from '../../src/components/BackButton.js';
import { useAnimals } from '../../src/hooks/useAnimals.js';
import { useShelter } from '../../src/hooks/useShelter.js';
import { useHealthRecord } from '../../src/hooks/useHealthRecord.js';

export default function EditAnimalScreen({ id_animal }) {
    const insets = useSafeAreaInsets();
    const styles = createStyles(insets);

    const { animals, fetchAnimalById, updateAnimal } = useAnimals();

    // 🔹 Estado editable
    const [form, setForm] = useState(null);

    // 🔹 Fetch inicial
    useEffect(() => {
        if (id_animal) {
            fetchAnimalById(id_animal);
        }
    }, [id_animal]);

    // 🔹 Cargar datos en el formulario
    useEffect(() => {
        if (animals) {
            setForm({
                nombre: animals.nombre || '',
                genero: animals.genero || '',
                edad: animals.edad?.toString() || '',
                tamano: animals.tamano || '',
                presentacion: animals.presentacion || '',
            });
        }
    }, [animals]);

    const handleChange = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSave = () => {
        const updatedAnimal = {
            ...animals,
            ...form,
            edad: parseInt(form.edad) || 0,
        };

        updateAnimal(updatedAnimal);
        alert('Cambios guardados');
    };

    if (!form) {
        return (
            <View style={styles.center}>
                <Text style={{ fontSize: scaleFont(16) }}>Cargando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView 
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Detalles del animal</Text>
                    <Text style={styles.close}>✕</Text>
                </View>

                {/* Carrusel */}
                <AnimalImagesCarousel imageUrls={animals.url_foto} />

                {/* Bloque turquesa */}
                <View style={styles.tealBlock}>

                    <Text style={styles.sectionTitle}>Nombre</Text>
                    <TextInput
                        style={styles.inputSimple}
                        value={form.nombre}
                        onChangeText={(v) => handleChange('nombre', v)}
                    />

                    <View style={styles.row}>
                        <View style={styles.cardContainer}>
                            <Text style={styles.label}>Género</Text>
                            <TextInput
                                style={styles.inputCard}
                                value={form.genero}
                                onChangeText={(v) => handleChange('genero', v)}
                            />
                        </View>

                        <View style={styles.cardContainer}>
                            <Text style={styles.label}>Edad</Text>
                            <TextInput
                                style={styles.inputCard}
                                keyboardType="numeric"
                                value={form.edad}
                                onChangeText={(v) => handleChange('edad', v)}
                            />
                        </View>

                        <View style={styles.cardContainer}>
                            <Text style={styles.label}>Tamaño</Text>
                            <TextInput
                                style={styles.inputCard}
                                value={form.tamano}
                                onChangeText={(v) => handleChange('tamano', v)}
                            />
                        </View>
                    </View>

                    <Text style={styles.sectionTitle}>Sobre el animal</Text>

                    <TextInput
                        style={styles.textArea}
                        multiline
                        value={form.presentacion}
                        onChangeText={(v) => handleChange('presentacion', v)}
                    />

                    {/* Botón guardar escalable */}
                    <Pressable style={styles.saveButton} onPress={handleSave}>
                        <Image 
                            source={require('../../assets/icons/GuardarBtn.png')} 
                            style={styles.saveButtonImage}
                            resizeMode="contain"
                        />
                    </Pressable>

                </View>
            </ScrollView>
        </View>
    );
}

const createStyles = (insets) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        flexGrow: 1,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: scaleSize(20),
        paddingTop: insets.top + scaleSize(10),
        paddingBottom: scaleSize(10),
    },
    title: {
        fontSize: scaleFont(20),
        fontWeight: 'bold',
    },
    close: {
        fontSize: scaleFont(24),
    },
    tealBlock: {
        backgroundColor: '#43B0A7',
        padding: scaleSize(20),
        borderTopLeftRadius: scaleSize(30),
        borderTopRightRadius: scaleSize(30),
        minHeight: scaleSize(500),
    },
    sectionTitle: {
        fontSize: scaleFont(16),
        fontWeight: 'bold',
        color: '#fff',
        marginTop: scaleSize(15),
        marginBottom: scaleSize(5),
    },
    inputSimple: {
        backgroundColor: '#fff',
        borderRadius: scaleSize(10),
        padding: scaleSize(10),
        fontSize: scaleFont(16),
        marginBottom: scaleSize(10),
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: scaleSize(10),
    },
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: scaleSize(12),
        padding: scaleSize(10),
        width: '31%', 
        alignItems: 'center',
    },
    label: {
        fontSize: scaleFont(12),
        color: '#666',
        marginBottom: scaleSize(4),
    },
    inputCard: {
        fontSize: scaleFont(14),
        fontWeight: 'bold',
        textAlign: 'center',
        width: '100%',
    },
    textArea: {
        backgroundColor: '#fff',
        borderRadius: scaleSize(10),
        padding: scaleSize(15),
        minHeight: scaleSize(120),
        textAlignVertical: 'top',
        fontSize: scaleFont(16),
        marginTop: scaleSize(5),
    },
    saveButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: scaleSize(30),
        marginBottom: insets.bottom + scaleSize(20),
    },
    saveButtonImage: {
        width: scaleSize(420), 
        height: scaleSize(65),  
    },
});