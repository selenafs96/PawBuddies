import { createContext, useState, useContext } from 'react';

const RegistroUsuarioContext = createContext();

export function RegistroProvider({ children }) {
  const [datosRegistro, setDatosRegistro] = useState({
    password: null,
    nombre: null,
    apellidos: null,
    email: null,
    telefono: null,
    url_foto:
      'https://vbmcpkjcfznvcszwlckm.supabase.co/storage/v1/object/public/imagenes_usuarios/perfil_generico.jpg',
    rol: '',
    id_protectora: null,
    localidad_preferida: null,
    radio_maximo_km: 50,
    descripcion: null,
    perros_propiedad: 0,
    gatos_propiedad: 0,
    otros_propiedad: 0,
  });

  const actualizarDatos = (nuevosCampos) => {
    setDatosRegistro((prev) => ({
      ...prev,
      ...nuevosCampos,
    }));
  };

  const resetearDatos = () => {
    setDatosRegistro({
      password: null,
      nombre: null,
      apellidos: null,
      email: null,
      telefono: null,
      url_foto:
        'https://vbmcpkjcfznvcszwlckm.supabase.co/storage/v1/object/public/imagenes_usuarios/perfil_generico.jpg',
      rol: '',
      id_protectora: null,
      localidad_preferida: null,
      radio_maximo_km: 50,
      descripcion: null,
      perros_propiedad: 0,
      gatos_propiedad: 0,
      otros_propiedad: 0,
    });
  };

  return (
    <RegistroUsuarioContext.Provider value={{ datosRegistro, actualizarDatos, resetearDatos }}>
      {children}
    </RegistroUsuarioContext.Provider>
  );
}
export const useRegistroUsuario = () => useContext(RegistroUsuarioContext);
