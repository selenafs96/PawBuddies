import { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { supabase } from '../../lib/supabase.js'

export const AdoptableAnimalDetail = () => {
    
    const [imageUrl, setImageUrl] = useState(null);
    
      useEffect(() => {
        fetchData()
      }, []);
    
      async function fetchData() {
        const {data: result, error} = await supabase.from('animal').select('url_foto').eq('nombre', 'Prueba').single();
        if (error) {
          console.log(error);
        } else if(result){
            console.log(`Url encontrada: ${result.url_foto}`)
          setImageUrl(result.url_foto);
        }
      }

    return (
        <View>
            <Image source={{uri: imageUrl}} style={styles.image}/>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 107,
        height: 147,
        backgroundColor: 'black'
    }
})