import { createContext, useState, useContext } from 'react';

const RegistroUsuarioContext = createContext();

export function RegistroProvider({ children }) {
    const [datosRegistro, setDatosRegistro] = useState({
        password: 'prueba6',
        nombre: 'prueba6',
        apellidos: 'prueba6apellidos',
        email: 'pruebasignup6@prueba.com',
        telefono: '123456789',
        url_foto: 'prueba',
        rol: 'Adoptante',
        id_protectora: null,
        localidad_preferida: '',
        radio_maximo_km: 50,
        descripcion: 'prueba',
        perros_propiedad: 0,
        gatos_propiedad: 0,
        otros_propiedad: 0,
    });

    const actualizarDatos = (nuevosCampos) => {
        setDatosRegistro((prev) => ({
            ...prev,
            ...nuevosCampos
        }));
    }

    return(
        <RegistroUsuarioContext.Provider value={{ datosRegistro, actualizarDatos }}>
            {children}
        </RegistroUsuarioContext.Provider>
    )

}
export const useRegistroUsuario = () => useContext(RegistroUsuarioContext);