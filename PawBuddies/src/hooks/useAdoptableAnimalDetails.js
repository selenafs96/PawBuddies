import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase.js"


export const useAdoptableAnimalDetails = ({ filter, value }) => {
  const [adoptableAnimalDetails, setAdoptableAnimalDetails] = useState([]);

  useEffect(() => {
    fetchAdoptableAnimalDetails();
  }, []);

  async function fetchAdoptableAnimalDetails() {
    const { data: result, error } = await supabase
      .from('animal')
      .select('id_animal, nombre, genero, edad, caracter, presentacion, especie, raza')
      .eq(filter, value)
      .single();
    if (error) {
      console.log(error);
    } else if (result) {
      console.log(result);
      setAdoptableAnimalDetails(result);
    }
  }

  return {
    adoptableAnimalDetails
  };
};
