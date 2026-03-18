import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

// Configura tus variables de entorno en app.json (extra) o usando un .env y un plugin.
const SUPABASE_URL =
  Constants?.expoConfig?.extra?.SUPABASE_URL ?? process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY =
  Constants?.expoConfig?.extra?.SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    'Falta configurar Supabase: define SUPABASE_URL y SUPABASE_ANON_KEY en app.json (extra) o en las variables de entorno.'
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Obtiene la URL pública de una imagen guardada en el bucket.
 * - Asegúrate de que el bucket exista y sea público (o tenga reglas para lectura).
 * - `path` debe ser la ruta dentro del bucket, por ejemplo: "avatars/user123.jpg".
 */
export function getPublicUrl(bucket, path) {
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}
