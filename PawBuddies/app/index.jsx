import LocalizacionScreen from '../src/screens/LocalizacionScreen.js';
import Login from '../src/screens/Login.js';
import Onboarding4 from './(adopters)/onboarding4.jsx';
import AdoptaScreen from './(animals)/list.jsx';
import VolunteerProfile from './(volunteers)/profile.jsx';
import RegistroAnimalesScreen from './(volunteers)/RegistroAnimalesScreen.jsx';

// const PawBuddies = () => {

//   return (
//     <Login/>
//   );
// };

// export default PawBuddies;

//ESTO ES LO QUE APARECERÁ UNA VEZ TENGAMOS TODAS LAS PANTALLAS CONECTADAS, REDIRIGIRÁ A LAS NOTICIAS AUTOMÁTICAMENTE Y PODREMOS EMPEZAR A NAVEGAR
import { Redirect } from 'expo-router';

export default function PawBuddies() {
  // return <Redirect href="/(adopters)/onboarding4" />;
  return <Onboarding4 />;
}
