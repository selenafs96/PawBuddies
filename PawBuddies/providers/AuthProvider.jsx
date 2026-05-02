import { createContext, useState, useEffect, useContext } from 'react';
import { router } from 'expo-router';
import { supabase } from '../src/lib/supabase.js';

const AuthContext = createContext({
    loading: true,
    session: null,
});

export default function AuthProvider(props) {
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);

    useEffect(() => {
        //Comprobamos si el usuario ya tiene una sesión iniciada
        async function fetchSession() {
            const { error, data } = await supabase.auth.getSession();

            if(error) {
                throw error;
            }

            if(data.session) {
                setSession(data.session);
            }
            else {
                router.replace('/');
            }

            setLoading(false);
        }

        fetchSession();

        const { data: authListener } = supabase.auth.onAuthStateChange(async(_, session) => {
            setSession(session);
            setLoading(false);

            if(session) {
                router.replace('/(noticias)/noticias')
            } else {
                router.replace('/')
            }
        });

        return () => {
            authListener?.subscription.unsubscribe();
        }
    }, [])

    return (
        <AuthContext.Provider value={{loading, session}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);