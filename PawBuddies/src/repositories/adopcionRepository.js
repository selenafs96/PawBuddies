import { supabase } from '../lib/supabase.js';

export const AdopcionRepository = {
  // Obtener la adopción aprobada de un usuario (con datos del animal)
  async getAdopcionAprobadaByUsuario(id_usuario) {
    const { data, error } = await supabase
      .from('adopcion')
      .select(
        `
        *,
        animal (*)
      `
      )
      .eq('id_usuario', id_usuario)
      .eq('estado_adopcion', 'Aprobada')
      .single();
    if (error) throw new Error(error.message);
    return data;
  },
};