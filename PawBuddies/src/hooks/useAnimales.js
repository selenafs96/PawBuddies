import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export const useAnimales = (filtro = 'todos') => {
    const [animales, setAnimales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAnimales();
    }, [filtro]);

    async function fetchAnimales() {
        setLoading(true);
        setError(null);

        let query = supabase
            .from('animal')
            .select('id_animal, nombre, edad, especie, raza, url_foto')
            .eq('estado', 'Adoptable');

        if (filtro === 'perro') query = query.eq('especie', 'Perro');
        if (filtro === 'gato') query = query.eq('especie', 'Gato');

        const { data, error } = await query;

        console.log('DATA:', JSON.stringify(data));
        console.log('ERROR:', JSON.stringify(error));
        console.log('FILTRO:', filtro);

        if (error) {
            setError(error.message);
        } else {
            setAnimales(data || []);
        }
        setLoading(false);
    }

    return { animales, loading, error };
};