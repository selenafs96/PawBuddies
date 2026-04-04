import { supabase } from '../lib/supabase.js';

export const ShelterRepository = {
  // Obtener todos los animales
  async getAll() {
    const { data, error } = await supabase.from('protectora').select('*');
    if (error) throw new Error(error.message);
    return data;
  },

  // Obtener un animal por su ID
  async getById(id) {
    const { data, error } = await supabase
      .from('protectora')
      .select('*')
      .eq('id_protectora', id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

//   async getByEspecieEstado(especie, estado) {
//     let query = supabase.from('animal').select('*');

//     if (estado && estado !== 'todos') {
//       query = query.eq('estado', estado);
//     }

//     if (especie && especie !== 'todos') {
//       query = query.eq('especie', especie);
//     }

//     const { data, error } = await query;
//     if (error) throw new Error(error.message);
//     return data;
//   },

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