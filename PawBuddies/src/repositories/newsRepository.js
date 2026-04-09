import { supabase } from '../lib/supabase.js';

export const NewsRepository = {

  async getAll() {
    const { data, error } = await supabase.from('noticias').select('*');
    if (error) throw new Error(error.message);
    return data;
  },

  // HACER LOS DEMÁS MÉTODOS COMO EN animalRepository
};
