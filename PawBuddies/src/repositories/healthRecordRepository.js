import { supabase } from '../lib/supabase.js';

export const HealthRecordRepository = {
  // Obtener todas las fichas sanitarias
  async getAll() {
    const { data, error } = await supabase.from('ficha_sanitaria').select('*');
    if (error) throw new Error(error.message);
    return data;
  },

  // Obtener una ficha por su ID
  async getByAnimalId(id) {
    const { data, error } = await supabase
      .from('ficha_sanitaria')
      .select('*')
      .eq('id_animal', id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  // ACTUALIZAR
  async update(id, updates) {
    const { data, error } = await supabase
      .from('ficha_sanitaria')
      .update(updates)
      .eq('id_ficha', id);
    if (error) throw new Error(error.message);
    return data;
  },

  // BORRAR
  async delete(id) {
    const { error } = await supabase
      .from('ficha_sanitaria')
      .delete()
      .eq('id_ficha', id);
    if (error) throw new Error(error.message);
  },
};
