import LocalizacionScreen from '../src/screens/LocalizacionScreen.js';
import Onboarding4 from './(adopters)/onboarding4.jsx';
import AdoptaScreen from './(animals)/list.jsx';
import Onboarding1 from './(volunteers)/onboardin1.jsx';
import VolunteerProfile from './(volunteers)/profile.jsx';
import RegistroAnimalesScreen from './(volunteers)/RegistroAnimalesScreen.jsx';

const PawBuddies = () => {

   return (
     <Onboarding1/>
   );
};

export default PawBuddies;

//ESTO ES LO QUE APARECERÁ UNA VEZ TENGAMOS TODAS LAS PANTALLAS CONECTADAS, REDIRIGIRÁ A LAS NOTICIAS AUTOMÁTICAMENTE Y PODREMOS EMPEZAR A NAVEGAR
/*import { Redirect } from 'expo-router';

export default function PawBuddies() {
  return <Redirect href="/(noticias)/noticias" />;

}*/
