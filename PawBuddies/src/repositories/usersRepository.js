import { supabase } from '../lib/supabase.js';

export const UsersRepository = {
  // Obtener todos los usuarios
  async getAll() {
    const { data, error } = await supabase.from('usuario').select('*');
    if (error) throw new Error(error.message);
    return data;
  },

  // Obtener un usuario por su ID
  async getById(id_usuario) {
    const { data, error } = await supabase
      .from('usuario')
      .select('*')
      .eq('id_usuario', id_usuario)
      .single();

      
    if (error){
      console.error("Error de Supabase:", error.message, error.details)
      throw new Error(error.message);
    } 
    console.log('Datos encontrados: ', data);
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

  async getConteoVoluntariosProtectora(id_usuario) {
    try {
      // 1. Obtenemos el id_protectora del usuario
      const { data: usuario, error: userError } = await supabase
        .from('usuario')
        .select('id_protectora')
        .eq('id_usuario', id_usuario)
        .single();

      if (userError || !usuario?.id_protectora) {
        throw new Error('No se encontró la protectora del usuario');
      }

      // 2. Contamos los perros en la tabla 'animal' que pertenecen a esa protectora
      // Usamos { count: 'exact', head: true } para que no traiga los datos, solo el número
      const { count, error: countError } = await supabase
        .from('usuario')
        .select('*', { count: 'exact', head: true })
        .eq('id_protectora', usuario.id_protectora)

      if (countError) throw countError;

      return count; // Devuelve el número total
    } catch (error) {
      console.error('Error en la consulta:', error.message);
      return 0;
    }
  },

  async getRolUsuario(id_usuario) {
    const { data, error } = await supabase
      .from('usuario')
      .select('rol')
      .eq('id_usuario', id_usuario)
      .single();

    if (error) throw new Error(error.message);
    return data.rol;
  }

};
