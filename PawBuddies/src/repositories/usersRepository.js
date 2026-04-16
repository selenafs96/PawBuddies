import { supabase } from '../lib/supabase.js';

export const UsersRepository = {
  // Obtener todos los usuarios
  async getAll() {
    const { data, error } = await supabase.from('usuario').select('*');
    if (error) throw new Error(error.message);
    return data;
  },

  // Obtener un usuario por su ID
  async getById(id) {
    const { data, error } = await supabase
      .from('usuario')
      .select('*')
      .eq('id_protectoraid_usuario', id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  // ACTUALIZAR
  async update(id, updates) {
    const { data, error } = await supabase
      .from('usuario')
      .update(updates)
      .eq('id_usuario', id);
    if (error) throw new Error(error.message);
    return data;
  },

  // BORRAR
  async delete(id) {
    const { error } = await supabase
      .from('usuario')
      .delete()
      .eq('id_usuario', id);
    if (error) throw new Error(error.message);
  },

  async create(userData) {
    const { data, error } = await supabase
      .from('usuario')
      .insert(userData)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },
};
