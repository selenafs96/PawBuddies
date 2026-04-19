import AdoptaConfirmScreen from "./(animals)/AdoptaConfirmScreen";

// const PawBuddies = () => {

//   return (
//     <AdoptaConfirmScreen/>
//   );
// };

// export default PawBuddies;

//ESTO ES LO QUE APARECERÁ UNA VEZ TENGAMOS TODAS LAS PANTALLAS CONECTADAS, REDIRIGIRÁ A LAS NOTICIAS AUTOMÁTICAMENTE Y PODREMOS EMPEZAR A NAVEGAR
import { Redirect } from 'expo-router';

export default function PawBuddies() {
  return <Redirect href="/(noticias)/noticias" />;

}
