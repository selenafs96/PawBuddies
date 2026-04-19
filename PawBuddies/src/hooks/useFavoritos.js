import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const ID_USUARIO_PRUEBA = 'b0000000-0000-0000-0000-000000000001';

export const useFavoritos = () => {
  const [favoritos, setFavoritos] = useState([]); // array de id_animal
  const [animalesFavoritos, setAnimalesFavoritos] = useState([]); // datos completos
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavoritos();
  }, []);

  async function fetchFavoritos() {
    setLoading(true);
    const { data, error } = await supabase
      .from('favorito')
      .select('id_animal, animal(id_animal, nombre, url_foto)')
      .eq('id_usuario', ID_USUARIO_PRUEBA);

    if (!error && data) {
      setFavoritos(data.map((f) => f.id_animal));
      setAnimalesFavoritos(data.map((f) => f.animal));
    }
    setLoading(false);
  }

  async function toggleFavorito(id_animal, id_usuario) {
    const esFavorito = favoritos.includes(id_animal);

    if (esFavorito) {
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
    } else {
      // Añadir a favoritos
      const { data, error } = await supabase
        .from('favorito')
        .insert({ id_usuario: id_usuario, id_animal: id_animal });
      setFavoritos((prev) => [...prev, id_animal]);

      if (error) {
        console.log(error);
      }
    }
  }

  async function eliminarFavorito(id_animal) {
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
