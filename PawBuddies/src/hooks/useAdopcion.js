import { useState } from 'react';
import { AdopcionRepository } from '../repositories/adopcionRepository.js';

export function useAdopcion() {
  const [adopcion, setAdopcion] = useState(null);
  const [adopcionLoading, setAdopcionLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAdopcionByUsuario = async (id_usuario) => {
    try {
      const data = await AdopcionRepository.getAdopcionAprobadaByUsuario(id_usuario);
      setAdopcion(data);
      setError(null);
    } catch (err) {
      console.error('Error cargando adopción:', err);
      setError(err);
      setAdopcion(null);
    } finally {
      setAdopcionLoading(false);
    }
  };

  const enviarSolicitudAdopcion = async (id_usuario, id_animal) => {
    try {
      await AdopcionRepository.enviarSolicitudAdopcion(id_usuario, id_animal);
    } catch (err) {
      console.error('Error enviando solicitud de adopción:', err);
      setError(err);
    }
  };

  return { adopcion, adopcionLoading, fetchAdopcionByUsuario, enviarSolicitudAdopcion, error };
}