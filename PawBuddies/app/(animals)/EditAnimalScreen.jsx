import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    ScrollView,
    TextInput,
    ActivityIndicator,
    Linking,
    Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { scaleFont, scaleSize } from '../../src/constants/layout.js';
import { AnimalImagesCarousel } from '../../src/components/AnimalImagesCarousel.js';
import { BackButton } from '../../src/components/BackButton.js';
import { useAnimals } from '../../src/hooks/useAnimals.js';

// testId: solo para desarrollo, cuando se renderiza sin navegación
export default function EditAnimalScreen({ testId }) {
    const insets = useSafeAreaInsets();
    const styles = createStyles(insets);
    const router = useRouter();

    const { id_animal: id_animal_param } = useLocalSearchParams();
    // Usa el parámetro de navegación si existe, si no usa testId (solo dev)
    const id_animal = id_animal_param ?? testId;

    const { animals, loading, fetchAnimalById, updateAnimal, deleteAnimal } = useAnimals();
    const [form, setForm] = useState(null);

    useEffect(() => {
        if (id_animal) fetchAnimalById(id_animal);
    }, [id_animal]);

    useEffect(() => {
        if (animals && animals.id_animal) {
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
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        try {
            const updates = {
                nombre: form.nombre,
                genero: form.genero,
                edad: parseInt(form.edad) || 0,
                tamano: form.tamano,
                presentacion: form.presentacion,
            };
            await updateAnimal(animals.id_animal, updates);
            alert('Cambios guardados');
        } catch (err) {
            alert('Error al guardar: ' + err.message);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteAnimal(animals.id_animal);
            alert('Animal eliminado');
            router.back();
        } catch (err) {
            alert('Error al eliminar: ' + err.message);
        }
    };

    const handleOpenMap = () => {
        const lat = animals?.latitud ?? 40.4168;
        const lon = animals?.longitud ?? -3.7038;
        const label = encodeURIComponent(animals?.nombre ?? 'Ubicación');
        Linking.openURL(`https://maps.google.com/?q=${lat},${lon}(${label})`);
    };

    if (loading || !form) {
        return (
            <View style={styles.centeredContainer}>
                <ActivityIndicator size="large" color="#3DBDB0" />
            </View>
        );
    }

    const lat = animals?.latitud ?? 40.4168;
    const lon = animals?.longitud ?? -3.7038;
    const mapUrl = `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lon}&zoom=14&size=400x150&markers=${lat},${lon},red`;

    return (
        <View style={styles.mainContainer}>
            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.titleContainer}>
                    <BackButton />
                    <Text style={styles.title}>Detalles del animal</Text>
                    <Pressable style={styles.closeButton} onPress={handleDelete}>
                        <Text style={styles.closeButtonText}>✕</Text>
                    </Pressable>
                </View>

                <AnimalImagesCarousel imageUrls={animals.url_foto} />

                <View style={styles.tealBlock}>
                    <Text style={styles.sectionTitle}>Nombre</Text>
                    <TextInput
                        style={styles.inputFull}
                        value={form.nombre}
                        onChangeText={(v) => handleChange('nombre', v)}
                        placeholder="Nombre del animal"
                        placeholderTextColor="#878a8a"
                    />

                    <View style={styles.dataRow}>
                        <View style={styles.inputCard}>
                            <Text style={styles.inputCardLabel}>Género</Text>
                            <TextInput
                                style={styles.inputCardValue}
                                value={form.genero}
                                onChangeText={(v) => handleChange('genero', v)}
                            />
                        </View>
                        <View style={styles.inputCard}>
                            <Text style={styles.inputCardLabel}>Edad</Text>
                            <TextInput
                                style={styles.inputCardValue}
                                keyboardType="numeric"
                                value={form.edad}
                                onChangeText={(v) => handleChange('edad', v)}
                            />
                        </View>
                        <View style={styles.inputCard}>
                            <Text style={styles.inputCardLabel}>Tamaño</Text>
                            <TextInput
                                style={styles.inputCardValue}
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
                        placeholder="Descripción del animal"
                        placeholderTextColor="#878a8a"
                        textAlignVertical="top"
                    />

                    <Text style={styles.sectionTitle}>Localización</Text>
                    <Pressable style={styles.mapContainer} onPress={handleOpenMap}>
                        <Image
                            source={{ uri: mapUrl }}
                            style={styles.mapImage}
                            resizeMode="cover"
                        />
                        <View style={styles.mapButton}>
                            <Text style={styles.mapButtonText}>🗺</Text>
                        </View>
                    </Pressable>

                    <Text style={styles.sectionTitle}>Documentación</Text>
                    <View style={styles.docRow}>
                        <View style={styles.docCard}>
                            <Text style={styles.docLabel}>Castración</Text>
                            <Text style={styles.docFileName}>document.pdf</Text>
                        </View>
                        <View style={styles.docCard}>
                            <Text style={styles.docLabel}>Vacunas</Text>
                            <Text style={styles.docFileName}>document.pdf</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.bottomView} />
            </ScrollView>

            {/* Barra Guardar fija */}
            <Pressable
                style={[styles.saveBar, { paddingBottom: insets.bottom > 0 ? insets.bottom : scaleSize(16) }]}
                onPress={handleSave}
            >
                <Image
                    source={require('../../assets/icons/GuardarBtn.png')}
                    style={styles.saveButtonImage}
                    resizeMode="contain"
                />
            </Pressable>
        </View>
    );
}

const createStyles = (insets) =>
    StyleSheet.create({
        mainContainer: { flex: 1, backgroundColor: '#FFFFFF' },
        centeredContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' },
        scrollContainer: { flex: 1, backgroundColor: '#FFFFFF', alignSelf: 'center', width: '100%'},
        scrollContent: { flexGrow: 1, paddingTop: insets.top, paddingBottom: 0 },
        titleContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', paddingVertical: scaleSize(8) },
        title: {
            fontFamily: 'TiltNeon',
            fontSize: scaleFont(20),
            flex: 1,
            textAlign: 'center',
        },
        closeButton: { width: scaleSize(36), height: scaleSize(36), backgroundColor: '#E53935', borderRadius: scaleSize(8), alignItems: 'center', justifyContent: 'center', marginRight: scaleSize(10) },
        closeButtonText: { color: '#FFFFFF', fontSize: scaleFont(14), fontWeight: 'bold' },
        tealBlock: { backgroundColor: '#3DBDB0', paddingHorizontal: scaleSize(15), paddingBottom: scaleSize(10) },
        sectionTitle: {
            fontFamily: 'TiltNeon',
            fontSize: scaleFont(20),
            fontWeight: 'bold',
            paddingTop: scaleSize(20),
            paddingLeft: scaleSize(5),
            paddingBottom: scaleSize(8),
        },
        inputFull: {
            backgroundColor: '#e8f7f6',
            borderRadius: scaleSize(10),
            paddingHorizontal: scaleSize(15),
            paddingVertical: scaleSize(10),
            fontFamily: 'TiltNeon',
            fontSize: scaleFont(16),
            color: '#000000',
            marginBottom: scaleSize(4),
        },
        dataRow: { flexDirection: 'row', justifyContent: 'space-between', gap: scaleSize(8), marginBottom: scaleSize(4) },
        inputCard: {
            backgroundColor: '#e8f7f6',
            borderRadius: scaleSize(10),
            flex: 1,
            paddingVertical: scaleSize(10),
            paddingHorizontal: scaleSize(15),
        },
        inputCardLabel: {
            fontFamily: 'TiltNeon',
            fontSize: scaleFont(14),
            color: '#878a8a',
        },
        inputCardValue: {
            fontFamily: 'TiltNeon',
            fontSize: scaleFont(16),
            color: '#000000',
        },
        textArea: {
            backgroundColor: '#e8f7f6',
            borderRadius: scaleSize(10),
            paddingHorizontal: scaleSize(15),
            paddingVertical: scaleSize(10),
            fontFamily: 'TiltNeon',
            fontSize: scaleFont(16),
            color: '#000000',
            minHeight: scaleSize(120),
            marginBottom: scaleSize(4),
        },
        mapContainer: { borderRadius: scaleSize(10), overflow: 'hidden', height: scaleSize(150), marginBottom: scaleSize(4), backgroundColor: '#e8f7f6' },
        mapImage: { width: '100%', height: '100%' },
        mapButton: { position: 'absolute', bottom: scaleSize(10), right: scaleSize(10), backgroundColor: '#3DBDB0', borderRadius: scaleSize(20), width: scaleSize(36), height: scaleSize(36), alignItems: 'center', justifyContent: 'center' },
        mapButtonText: { fontSize: scaleFont(18) },
        docRow: { flexDirection: 'row', gap: scaleSize(12), marginTop: scaleSize(4), marginBottom: scaleSize(20) },
        docCard: { backgroundColor: '#e8f7f6', borderRadius: scaleSize(10), paddingVertical: scaleSize(10), paddingHorizontal: scaleSize(15), flex: 1, gap: scaleSize(4) },
        docLabel: {
            fontFamily: 'TiltNeon',
            fontSize: scaleFont(14),   // igual que DataCard category
            color: '#878a8a',
        },
        docFileName: {
            fontFamily: 'TiltNeon',
            fontSize: scaleFont(16),   // igual que DataCard data
            color: '#000000',
        },
        bottomView: { width: '100%', height: scaleSize(80), backgroundColor: '#3DBDB0' },
        saveBar: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingTop: scaleSize(10), paddingHorizontal: scaleSize(20), alignItems: 'center' },
        saveButtonImage: { width: '100%', height: scaleSize(55) },
    });