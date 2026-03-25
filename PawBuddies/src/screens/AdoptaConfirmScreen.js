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

export default function AdoptaConfirmScreen({ onVolver }) {

    const [animalesLista, setAnimalesLista] = useState([
        { id: '1', nombre: 'Luna', estado: '¿Solicitar adopción?', solicitado: false, imagen: 'https://eq2imhfmrcc.exactdn.com/wp-content/uploads/2016/08/golden-retriever-650x471.jpg?strip=all' },
        { id: '2', nombre: 'Misi', estado: '¿Solicitar adopción?', solicitado: false, imagen: 'https://images.ctfassets.net/denf86kkcx7r/4IPlg4Qazd4sFRuCUHIJ1T/f6c71da7eec727babcd554d843a528b8/gatocomuneuropeo-97?fm=webp&w=913' },
        { id: '3', nombre: 'Rocky', estado: '¿Solicitar adopción?', solicitado: false, imagen: 'https://eq2imhfmrcc.exactdn.com/wp-content/uploads/2016/08/poodle-caniche.jpg?strip=all' },
        { id: '4', nombre: 'Toby', estado: '¿Solicitar adopción?', solicitado: false, imagen: 'https://eq2imhfmrcc.exactdn.com/wp-content/uploads/2016/08/bichon-frise.jpg?strip=all' },
        { id: '5', nombre: 'Bono', estado: '¿Solicitar adopción?', solicitado: false, imagen: 'https://eq2imhfmrcc.exactdn.com/wp-content/uploads/2016/08/boston-terrier.jpg?strip=all' },
        { id: '6', nombre: 'Nala', estado: '¿Solicitar adopción?', solicitado: false, imagen: 'https://img.freepik.com/foto-gratis/primer-disparo-vertical-lindo-gato-europeo-pelo-corto_181624-34587.jpg?semt=ais_hybrid&w=740&q=80' },
    ]);

    const [busqueda, setBusqueda] = useState('');
    const [tab, setTab] = useState('adoptar'); 
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

    const animalesFiltrados = animalesLista.filter(a =>
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
                        <Text style={styles.animalSolicitado}>✓ Solicitar adopción</Text>
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

    const borrarSeleccionados = () => {
        setAnimalesLista(prev => prev.filter(a => !seleccionAdoptar[a.id]));
        setSeleccionAdoptar({});
        setMostrarConfirm(false);
    };

    return (
        <View style={styles.wrapper}>
            <SafeAreaView style={styles.safeArea}>

                {/* HEADER */}
                <View style={styles.header}>
                    <TouchableOpacity style={{ position: 'absolute', left: 20 }} onPress={onVolver}>
                        <Image
                            source={require('../../assets/icons/arrow_back.png')}
                        />
                    </TouchableOpacity>
                    <Text style={styles.titulo}>¿Quieres adoptar?</Text>
                    <TouchableOpacity style={{ position: 'absolute', right: 20, opacity: tieneSeleccion(seleccionAdoptar) ? 1 : 0.3 }} onPress={borrarSeleccionados} disabled={!tieneSeleccion(seleccionAdoptar)}>
                        <Image
                            source={require('../../assets/icons/iconoPapelera.png')}
                            style={styles.iconoPapelera}
                        />
                    </TouchableOpacity>
                </View>

                {/* FILTROS */}
                <View style={styles.filtrosRow}>

                    {/* BUSCADOR */}
                    <View style={styles.buscadorDentro}>
                        <Image
                            source={require('../../assets/icons/search.png')}
                            style={styles.buscadorIcono}
                        />
                        <TextInput
                            style={styles.buscadorInput}
                            placeholder="Busca por el nombre"
                            placeholderTextColor="#999"
                            value={busqueda}
                            onChangeText={setBusqueda}
                        />
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
        width: '100%',
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 10,
        paddingRight: 10,
        paddingLeft: 10,
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
        fontFamily: 'TiltNeon',
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
    buscadorIcono: {
        fontSize: 16,
        marginRight: 8,
        color: '#999',
    },
    buscadorInput: {
        fontFamily: 'TiltNeon',
        flex: 1,
        fontSize: 15,
        color: '#222',
    },
    buscadorDentro: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#DDD',
        paddingHorizontal: 63,
        paddingVertical: 10,
    },

    // Filtros
    filtrosRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        backgroundColor: '#E8F8F5',
        borderRadius: 12,
        padding: 8,
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
        fontFamily: 'TiltNeon',
        fontSize: 14,
        color: '#888',
        fontWeight: '500',
    },
    tabTextoActivo: {
        fontFamily: 'TiltNeon',
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
        fontFamily: 'TiltNeon',
        fontSize: 16,
        fontWeight: '600',
        color: '#222',
    },
    animalEstado: {
        fontFamily: 'TiltNeon',
        fontSize: 13,
        color: '#999',
        marginTop: 2,
    },
    animalSolicitado: {
        fontFamily: 'TiltNeon',
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
        fontFamily: 'TiltNeon',
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
        fontFamily: 'TiltNeon',
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
        fontFamily: 'TiltNeon',
        color: '#3DBDB0',
        fontSize: 16,
        fontWeight: '600',
    },
});