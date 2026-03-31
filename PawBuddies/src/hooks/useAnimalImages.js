import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase.js"


export const useAnimalImages = ({ filter, value }) => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data: result, error } = await supabase
      .from('animal')
      .select('url_foto')
      .eq(filter, value)
      .single();
    if (error) {
      console.log(error);
    } else if (result) {
      console.log(`Url encontrada: ${result.url_foto}`);
      setImageUrls(result.url_foto);
    }
  }

  return {
    imageUrls
  };
};