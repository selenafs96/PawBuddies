import VolunteerOnboarding1 from './(volunteers)/onboardin1.jsx';
import VolunteerOnboarding3 from './(volunteers)/onboarding4.jsx';

// export default function PawBuddies() {
//   return <VolunteerOnboarding1 />;
// }

//ESTO ES LO QUE APARECERÁ UNA VEZ TENGAMOS TODAS LAS PANTALLAS CONECTADAS, REDIRIGIRÁ A LAS NOTICIAS AUTOMÁTICAMENTE Y PODREMOS EMPEZAR A NAVEGAR
import { Redirect } from 'expo-router';

export default function PawBuddies() {
  return <Redirect href="/(noticias)/noticias" />;
}
