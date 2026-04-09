# PawBuddies

REQUISITOS A TENER EN CUENTA:
NO subir cambios en los siguientes archivos (o consultar al grupo si se necesita):
- lib/supabase.js -> es el archivo de configuración de supabase.
- .env -> son las variables de entorno que necesita supabase (URL y key).
- supabase/shemas/pawbuddies.sql -> Es el script de creación de la base de datos.

NO eliminar ni modificar versiones de las dependencias de los siguientes archivos (se puede añadir nuevas dependencias sin problema):
- package.json
- package-lock.json
- 

EXPLICACIÓN CAMBIOS:
Cambiado:
- repositories -> están las consultas a la bbdd, un archivo repository por tabla de la bbdd
- hooks -> los hooks llaman a los repositories creando funciones que luego podrán llamar los componentes
- componentes y pantallas -> llaman a los hooks para hacer cada uno la consulta que necesite

Estructura de rutas:
- para que funcione la navegación entre pantallas de expo router, las pantallas tienen que estar en la estructura de carpetas "app". Para las rutas dinamicas, el archivo de la pantalla tiene que llamarse  "[algo].js" (rutas dinámicas es, por ejemplo, que cogerá el id del animal del que seleccione el botón "Ver" en la pantalla de la Lista de animales y lo utilizará para acceder a la pantalla Detalles del animal con ese id en concreto).
- Cuando queremos que al hacer click en un componente redirija a otra pantalla (como el botón Ver de la lista), hay que envolver ese componente en la etiqueta Link con atributos href="*indicar aquí la ruta de la pantalla a la que queremos ir" y asChild.
- Cuando es una ruta dinámica, en el href se le indican dos cosas: pathname (que sería la ruta) y params (que sería el id del animal que queremos ver).
- cuando escribimos el nombre de la carpeta entre parentesis, significa que no va a aparecer en la ruta visible, solo sirve para organizar archivos.
