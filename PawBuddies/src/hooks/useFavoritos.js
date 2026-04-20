import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Alert } from 'react-native';

export const useFavoritos = () => {
  const [favoritos, setFavoritos] = useState([]); // array de id_animal
  const [animalesFavoritos, setAnimalesFavoritos] = useState([]); // datos completos
  const [loading, setLoading] = useState(true);

  async function fetchFavoritos(id_usuario) {

    if(!id_usuario) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from('favorito')
      .select('id_animal, animal(id_animal, nombre, url_foto)')
      .eq('id_usuario', id_usuario);

    if (!error && data) {
      setFavoritos(data.map((f) => f.id_animal));
      setAnimalesFavoritos(data.map((f) => f.animal));
    }
    setLoading(false);
  }

  const checkEsFavorito = async (id_usuario, id_animal) => {
    const { data, error } = await supabase
      .from('favorito')
      .select('id_favorito') // Solo pedimos el ID para minimizar transferencia
      .eq('id_usuario', id_usuario)
      .eq('id_animal', id_animal)
      .maybeSingle(); // Retorna un objeto o null si no existe

    if (error) {
      console.error('Error al verificar favorito:', error);
      return false;
    }

    // Si 'data' tiene contenido, el registro existe
    return !!data;
  };

  async function toggleFavorito(id_animal, id_usuario) {
    setLoading(true);
    if (await checkEsFavorito(id_usuario, id_animal)) {
      // Eliminar de favoritos
      await supabase
        .from('favorito')
        .delete()
        .eq('id_usuario', id_usuario)
        .eq('id_animal', id_animal);
      setFavoritos((prev) => prev.filter((id) => id != id_animal));
      setAnimalesFavoritos((prev) =>
        prev.filter((a) => a.id_animal != id_animal),
      );
      setLoading(false);
    } else {
      // Añadir a favoritos
      const { data, error } = await supabase
        .from('favorito')
        .insert({ id_usuario: id_usuario, id_animal: id_animal });
      setFavoritos((prev) => [...prev, id_animal]);
      setLoading(false);
      if (error) {
        console.log(error);
      }
    }
  }

  async function eliminarFavorito(id_animal, id_usuario) {
    await supabase
      .from('favorito')
      .delete()
      .eq('id_usuario', id_usuario)
      .eq('id_animal', id_animal);
    setFavoritos((prev) => prev.filter((id) => id != id_animal));
    setAnimalesFavoritos((prev) =>
      prev.filter((a) => a.id_animal != id_animal),
    );
  }

  return {
    favoritos,
    animalesFavoritos,
    loading,
    toggleFavorito,
    eliminarFavorito,
    fetchFavoritos,
  };
};
