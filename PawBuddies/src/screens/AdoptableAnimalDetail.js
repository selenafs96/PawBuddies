import { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { supabase } from '../../lib/supabase.js'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView } from "react-native-web";

export const AdoptableAnimalDetail = () => {
    
    const [imageUrl, setImageUrl] = useState(null);
    const insets = useSafeAreaInsets();
    
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
        <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
          <ScrollView>
            <Image source={{uri: imageUrl}} style={styles.image}/>
          </ScrollView> 
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