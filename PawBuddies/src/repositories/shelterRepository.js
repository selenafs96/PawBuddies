import { supabase } from '../lib/supabase.js';

export const ShelterRepository = {
  // Obtener todos los protectoras
  async getAll() {
    const { data, error } = await supabase.from('protectora').select('*');
    if (error) throw new Error(error.message);
    return data;
  },

  // Obtener una protectora por su ID
  async getById(id) {
    const { data, error } = await supabase
      .from('protectora')
      .select('*')
      .eq('id_protectora', id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  // ACTUALIZAR
  async update(id, updates) {
    const { data, error } = await supabase
      .from('protectora')
      .update(updates)
      .eq('id_protectora', id);
    if (error) throw new Error(error.message);
    return data;
  },

  // BORRAR
  async delete(id) {
    const { error } = await supabase
      .from('protectora')
      .delete()
      .eq('id_protectora', id);
    if (error) throw new Error(error.message);
  },
};