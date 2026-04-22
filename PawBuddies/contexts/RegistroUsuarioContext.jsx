import { createContext, useState, useContext } from 'react';

const RegistroUsuarioContext = createContext();

export function RegistroProvider({ children }) {
    const [datosRegistro, setDatosRegistro] = useState({
        password: '',
        nombre: '',
        apellidos: '',
        email: '',
        telefono: '',
        url_foto: 'https://vbmcpkjcfznvcszwlckm.supabase.co/storage/v1/object/public/imagenes_usuarios/perfil_generico.jpg',
        rol: 'Adoptante',
        id_protectora: null,
        localidad_preferida: '',
        radio_maximo_km: 50,
        descripcion: '',
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