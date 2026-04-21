import AnimalAdoptadoScreen from "../src/screens/AnimalAdoptadoScreen";
import AdoptaConfirmScreen from "./(animals)/AdoptaConfirmScreen";
import VolunteerOnboarding1 from "./(volunteers)/onboardin1";
import RegistroAdoptantesScreen from "./(volunteers)/registroAdoptantes";
import RegistroAnimalesScreen from "./(volunteers)/RegistroAnimalesScreen";

// const PawBuddies = () => {

//    return (
//      <AnimalAdoptadoScreen/>
//    );
// };

// export default PawBuddies;

//ESTO ES LO QUE APARECERÁ UNA VEZ TENGAMOS TODAS LAS PANTALLAS CONECTADAS, REDIRIGIRÁ A LAS NOTICIAS AUTOMÁTICAMENTE Y PODREMOS EMPEZAR A NAVEGAR
import { Redirect } from 'expo-router';

export default function PawBuddies() {
  return <Redirect href="/(adopters)/onboarding2" />;
}
