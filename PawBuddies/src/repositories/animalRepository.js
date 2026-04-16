import { supabase } from '../lib/supabase.js';

export const AnimalRepository = {
  // Obtener todos los animales
  async getAll() {
    const { data, error } = await supabase.from('animal').select('*');
    if (error) throw new Error(error.message);
    return data;
  },

  // Obtener un animal por su ID
  async getById(id) {
    const { data, error } = await supabase
      .from('animal')
      .select('*')
      .eq('id_animal', id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  async getByEspecieEstado(especie, estado) {
    let query = supabase.from('animal').select('*');

    if (estado && estado !== 'todos') {
      query = query.eq('estado', estado);
    }

    if (especie && especie !== 'todos') {
      query = query.eq('especie', especie);
    }

    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
  },

  // ACTUALIZAR
  async update(id, updates) {
    const { data, error } = await supabase
      .from('animal')
      .update(updates)
      .eq('id_animal', id);
    if (error) throw new Error(error.message);
    return data;
  },

  // BORRAR
  async delete(id) {
    const { error } = await supabase
      .from('animal')
      .delete()
      .eq('id_animal', id);
    if (error) throw new Error(error.message);
  },

  async getConteoPerrosProtectora(id_usuario) {
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
        .from('animal')
        .select('*', { count: 'exact', head: true })
        .eq('id_protectora', usuario.id_protectora)
        .eq('especie', 'Perro'); // Ajusta 'especie' y 'Perro' según tus nombres en la DB

      if (countError) throw countError;

      return count; // Devuelve el número total
    } catch (error) {
      console.error('Error en la consulta:', error.message);
      return 0;
    }
  },
  async getConteoGatosProtectora(id_usuario) {
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
        .from('animal')
        .select('*', { count: 'exact', head: true })
        .eq('id_protectora', usuario.id_protectora)
        .eq('especie', 'Gato');

      if (countError) throw countError;

      return count; // Devuelve el número total
    } catch (error) {
      console.error('Error en la consulta:', error.message);
      return 0;
    }
  },
};
