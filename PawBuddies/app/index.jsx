/*import EditAnimalScreen from "./(animals)/EditAnimalScreen.jsx";
import AdoptaScreen from "./(animals)/list.jsx";

const PawBuddies = () => {

  return (
    <EditAnimalScreen/>
  );
};

export default PawBuddies;*/

import EditAnimalScreen from "./(animals)/EditAnimalScreen.jsx";

// Para probar la pantalla temporalmente, pasamos el id_animal como prop
// Una vez que la navegación esté implementada, este archivo volverá a su estado original
const PawBuddies = () => {
  return (
    <EditAnimalScreen testId="c0000000-0000-0000-0000-000000000001" />
  );
};

export default PawBuddies;