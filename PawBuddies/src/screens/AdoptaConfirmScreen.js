import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Image,
    Animated,
} from 'react-native';

const animales = [
    { id: '1', nombre: 'Luna', estado: 'Solicitar adopción', solicitado: true, imagen: 'https://placedog.net/400/300?id=1' },
    { id: '2', nombre: 'Misi', estado: '¿Solicitar adopción/acogida?', solicitado: false, imagen: 'https://placekitten.com/400/300' },
    { id: '3', nombre: 'Rocky', estado: '¿Solicitar adopción/acogida?', solicitado: false, imagen: 'https://placedog.net/400/300?id=2' },
    { id: '4', nombre: 'Toby', estado: '¿Solicitar adopción/acogida?', solicitado: false, imagen: 'https://placedog.net/400/300?id=3' },
    { id: '5', nombre: 'Bono', estado: '¿Solicitar adopción/acogida?', solicitado: false, imagen: 'https://placekitten.com/401/300' },
    { id: '6', nombre: 'Nala', estado: '¿Solicitar adopción/acogida?', solicitado: false, imagen: 'https://placekitten.com/402/300' },
];

export default function AdoptaConfirmScreen({ onVolver }) {
    const [busqueda, setBusqueda] = useState('');
    const [tab, setTab] = useState('adoptar'); // solo Adoptar ya no hay Acoger
    const [seleccionAdoptar, setSeleccionAdoptar] = useState({});
    const [mostrarConfirm, setMostrarConfirm] = useState(false);
    const [isSheetVisible, setIsSheetVisible] = useState(false);

    const bottomSheetAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (mostrarConfirm) {
            setIsSheetVisible(true);
            Animated.timing(bottomSheetAnim, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(bottomSheetAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start(({ finished }) => {
                if (finished) setIsSheetVisible(false);
            });
        }
    }, [mostrarConfirm]);

    const animalesFiltrados = animales.filter(a =>
        a.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    const tieneSeleccion = (adoptar) => {
        return Object.values(adoptar).some(Boolean);
    };

    const toggleAdoptar = (id) => {
        setSeleccionAdoptar(prev => {
            const next = { ...prev, [id]: !prev[id] };
            setMostrarConfirm(tieneSeleccion(next));
            return next;
        });
    };


    const renderItem = ({ item }) => {
        const adoptado = seleccionAdoptar[item.id];

        return (
            <View style={styles.animalRow}>
                <Image source={{ uri: item.imagen }} style={styles.animalFoto} />
                <View style={styles.animalInfo}>
                    <Text style={styles.animalNombre}>{item.nombre}</Text>
                    {adoptado ? (
                        <Text style={styles.animalSolicitado}>✓✓ Solicitar adopción</Text>
                    ) : (
                        <Text style={styles.animalEstado}>{item.estado}</Text>
                    )}
                </View>
                <View style={styles.radioGroup}>
                    <TouchableOpacity
                        style={styles.radioBtn}
                        onPress={() => toggleAdoptar(item.id)}
                    >
                        <View style={[styles.radioOuter, adoptado && styles.radioOuterActivo]}>
                            {adoptado && <View style={styles.radioInner} />}
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.wrapper}>
            <SafeAreaView style={styles.safeArea}>

                {/* HEADER */}
                <View style={styles.header}>
                    <TouchableOpacity style={{ position: 'absolute', left: 20 }} onPress={onVolver}>
                        <Image
                            source={require('../../assets/icons/arrow_back.png')}
                            style={styles.iconoPapelera}
                        />
                    </TouchableOpacity>    
                        <Text style={styles.titulo}>¿Adoptas o Acoges?</Text>
                        <TouchableOpacity style={{ position: 'absolute', right: 20 }}>
                            <Image
                                source={require('../../assets/icons/iconoPapelera.png')}
                                style={styles.iconoPapelera}
                            />
                        </TouchableOpacity>
                </View>

                {/* BUSCADOR */}
                <View style={styles.buscadorContainer}>
                    <Text style={styles.buscadorIcono}>🔍</Text>
                    <TextInput
                        style={styles.buscadorInput}
                        placeholder="Busca por el nombre"
                        placeholderTextColor="#999"
                        value={busqueda}
                        onChangeText={setBusqueda}
                    />
                </View>

                {/* FILTROS */}
                <View style={styles.filtrosRow}>
                    <TouchableOpacity style={styles.filtroIcono}>
                        <Text style={{ color: '#3DBDB0', fontSize: 18 }}>☰</Text>
                    </TouchableOpacity>
                    <View style={styles.tabs}>
                        <TouchableOpacity
                            style={[styles.tab, tab === 'adoptar' && styles.tabActivo]}
                            onPress={() => setTab('adoptar')}
                        >
                            <Text style={[styles.tabTexto, tab === 'adoptar' && styles.tabTextoActivo]}>
                                Adoptar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* LISTA */}
                <FlatList
                    data={animalesFiltrados}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.lista}
                    ListFooterComponent={<View style={{ height: 180 }} />}
                />

            </SafeAreaView>

            {/* BOTTOM SHEET CONFIRMACION */}
            {isSheetVisible && (
                <Animated.View
                    style={[
                        styles.bottomSheet,
                        {
                            opacity: bottomSheetAnim,
                            transform: [
                                {
                                    translateY: bottomSheetAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [120, 0],
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <View style={styles.bottomSheetLinea} />
                    <Text style={styles.bottomSheetTexto}>¿Quieres enviar una solicitud de adopción?</Text>
                    <View style={styles.bottomSheetBotones}>
                        <TouchableOpacity style={styles.btnEnviar}>
                            <Text style={styles.btnEnviarTexto}>Enviar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btnAnular}
                            onPress={() => {
                                setSeleccionAdoptar({});
                                setMostrarConfirm(false);
                            }}
                        >
                            <Text style={styles.btnAnularTexto}>Anular</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    // Header
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        position: 'relative',
    },
    titulo: {
        fontSize: 20,
        fontWeight: '600',
        color: '#222',
    },
    iconoPapelera: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        tintColor: '#222',
        fontSize: 22,
    },

    // Buscador
    buscadorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 12,
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#DDD',
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    buscadorIcono: {
        fontSize: 16,
        marginRight: 8,
        color: '#999',
    },
    buscadorInput: {
        flex: 1,
        fontSize: 15,
        color: '#222',
    },

    // Filtros
    filtrosRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 16,
        backgroundColor: '#E8F8F5',
        borderRadius: 12,
        padding: 6,
        gap: 8,
    },
    filtroIcono: {
        padding: 6,
    },
    tabs: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end',
        gap: 4,
    },
    tab: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    tabActivo: {
        backgroundColor: '#FFFFFF',
    },
    tabTexto: {
        fontSize: 14,
        color: '#888',
        fontWeight: '500',
    },
    tabTextoActivo: {
        color: '#222',
        fontWeight: '600',
    },

    // Lista
    lista: {
        paddingHorizontal: 20,
    },
    animalRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 0.5,
        borderBottomColor: '#EEE',
    },
    animalFoto: {
        width: 56,
        height: 56,
        borderRadius: 28,
        marginRight: 12,
    },
    animalInfo: {
        flex: 1,
    },
    animalNombre: {
        fontSize: 16,
        fontWeight: '600',
        color: '#222',
    },
    animalEstado: {
        fontSize: 13,
        color: '#999',
        marginTop: 2,
    },
    animalSolicitado: {
        fontSize: 13,
        color: '#3DBDB0',
        marginTop: 2,
        fontWeight: '500',
    },

    // Radio buttons
    radioGroup: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
    },
    radioBtn: {
        padding: 4,
    },
    radioOuter: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#CCC',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioOuterActivo: {
        borderColor: '#3DBDB0',
        backgroundColor: '#3DBDB0',
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
    },

    // Bottom sheet
    bottomSheet: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingBottom: 30,
        paddingTop: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 20,
    },
    bottomSheetLinea: {
        width: 40,
        height: 4,
        backgroundColor: '#DDD',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 16,
    },
    bottomSheetTexto: {
        fontSize: 16,
        fontWeight: '500',
        color: '#222',
        marginBottom: 16,
    },
    bottomSheetBotones: {
        flexDirection: 'row',
        gap: 12,
    },
    btnEnviar: {
        flex: 1,
        backgroundColor: '#3DBDB0',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
    },
    btnEnviarTexto: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    btnAnular: {
        flex: 1,
        backgroundColor: '#E8F8F5',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
    },
    btnAnularTexto: {
        color: '#3DBDB0',
        fontSize: 16,
        fontWeight: '600',
    },
});