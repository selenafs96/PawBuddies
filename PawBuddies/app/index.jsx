import EditAnimalScreen from "./(animals)/EditAnimalScreen.jsx";
import AdoptaScreen from "./(animals)/list.jsx";
import VolunteerProfile from "./(volunteers)/profile.jsx";

const PawBuddies = () => {

  return (
    <AdoptaScreen />
  );
};

export default PawBuddies;

//ESTO ES LO QUE APARECERÁ UNA VEZ TENGAMOS TODAS LAS PANTALLAS CONECTADAS, REDIRIGIRÁ A LAS NOTICIAS AUTOMÁTICAMENTE Y PODREMOS EMPEZAR A NAVEGAR
// import { Redirect } from 'expo-router';

// export default function Index() {
//   return <Redirect href="/(noticias)/123" />;
// }

/*import AnimalAdoptadoScreen from "../src/screens/AnimalAdoptadoScreen.js";

const PawBuddies = () => {
  return (
    <AnimalAdoptadoScreen id_usuario="6f26b6ea-105b-4ac4-a59b-7dbb84338ebe" />
  );
};

export default PawBuddies;*/
