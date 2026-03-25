-- DROP TABLE IF EXISTS protectora CASCADE;
-- DROP TABLE IF EXISTS usuario CASCADE;
-- DROP TABLE IF EXISTS noticia CASCADE;
-- DROP TABLE IF EXISTS colonia CASCADE;
-- DROP TABLE IF EXISTS gestiona CASCADE;
-- DROP TABLE IF EXISTS producto CASCADE;
-- DROP TABLE IF EXISTS stock CASCADE;
-- DROP TABLE IF EXISTS animal CASCADE;
-- DROP TABLE IF EXISTS ficha_sanitaria CASCADE;
-- DROP TABLE IF EXISTS tratamiento_preventivo CASCADE;
-- DROP TABLE IF EXISTS adopcion CASCADE;

CREATE TABLE protectora (
  id_protectora UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  cif CHAR(9) UNIQUE NOT NULL,
  telefono_contacto TEXT NOT NULL,
  email_contacto TEXT UNIQUE NOT NULL,
  provincia TEXT NOT NULL,
  localidad TEXT NOT NULL,
  calle TEXT NOT NULL,
  numero TEXT NOT NULL,
  codigo_postal TEXT NOT NULL,
  presentacion TEXT
);

CREATE TABLE usuario (
  id_usuario UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Mirar si con la autentificación de supabase tengo que poner auth.users()
  nombre VARCHAR(100) NOT NULL,
  apellidos TEXT,
  email TEXT,
  telefono TEXT,
  url_foto TEXT,
  rol TEXT NOT NULL,
  id_protectora UUID REFERENCES protectora(id_protectora) ON DELETE CASCADE NOT NULL,
  CONSTRAINT check_rol CHECK (rol IN ('Administrador', 'Voluntario', 'Adoptante'))
);

CREATE TABLE noticia (
  id_noticia UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  cuerpo TEXT NOT NULL,
  url_imagen TEXT,
  id_usuario UUID REFERENCES usuario(id_usuario) ON DELETE CASCADE NOT NULL
);

CREATE TABLE colonia (
  id_colonia UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  latitud DECIMAL(8,6),
  longitud DECIMAL(9,6),
  id_protectora UUID REFERENCES protectora(id_protectora) ON DELETE CASCADE NOT NULL
);

CREATE TABLE gestiona (
  id_usuario UUID REFERENCES usuario(id_usuario) ON DELETE CASCADE NOT NULL,
  id_colonia UUID REFERENCES colonia(id_colonia) ON DELETE CASCADE NOT NULL,
  PRIMARY KEY(id_usuario, id_colonia)
);

CREATE TABLE producto (
  id_producto UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  descripcion TEXT,
  categoria TEXT,
  unidad_medida TEXT NOT NULL
);

CREATE TABLE stock (
  id_stock UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
  cantidad_actual DECIMAL(10,2) NOT NULL,
  id_protectora UUID REFERENCES protectora(id_protectora) ON DELETE CASCADE NOT NULL,
  id_producto UUID REFERENCES producto(id_producto) ON DELETE CASCADE NOT NULL
);

CREATE TABLE animal (
  id_animal UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  edad SMALLINT,
  genero TEXT NOT NULL,
  especie TEXT NOT NULL,
  raza TEXT NOT NULL,
  caracter TEXT,
  presentacion TEXT,
  estado TEXT NOT NULL,
  url_foto TEXT[] DEFAULT '{}',
  id_protectora UUID REFERENCES protectora(id_protectora) ON DELETE CASCADE NOT NULL,
  id_usuario UUID REFERENCES usuario(id_usuario) ON DELETE CASCADE,
  id_colonia UUID REFERENCES colonia(id_colonia) ON DELETE CASCADE,
  CONSTRAINT check_estado CHECK (estado IN ('Adoptable', 'No Adoptable', 'Adoptado'))
  CONSTRAINT check_especie CHECK (estado IN ('Perro', 'Gato'))
);

CREATE TABLE ficha_sanitaria (
  id_ficha UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
  estado_actual TEXT,
  antecedentes TEXT,
  enfermedades_activas TEXT,
  patologias_cronicas TEXT,
  esterilizacion CHAR(2),
  id_animal UUID REFERENCES animal(id_animal) ON DELETE CASCADE NOT NULL UNIQUE,
  CONSTRAINT check_esterilizacion CHECK (esterilizacion IN ('Sí', 'No'))
);

CREATE TABLE tratamiento_preventivo (
  id_preventivo UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  tipo TEXT NOT NULL,
  fecha_ultima DATE NOT NULL,
  fecha_proxima DATE,
  nombre_centro TEXT,
  id_animal UUID REFERENCES animal(id_animal) ON DELETE CASCADE NOT NULL,
  CONSTRAINT check_tipo CHECK (tipo IN ('Vacuna', 'Desparasitación', 'Otros')),
  CONSTRAINT check_fechas CHECK (fecha_proxima > fecha_ultima)
);

CREATE TABLE adopcion(
  id_adopcion UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
  estado_adopcion TEXT,
  fecha_adopcion DATE,
  url_contrato TEXT,
  id_usuario UUID REFERENCES usuario(id_usuario) ON DELETE CASCADE NOT NULL,
  id_animal UUID REFERENCES animal(id_animal) ON DELETE CASCADE NOT NULL,
  CONSTRAINT check_estado_adopcion CHECK (estado_adopcion IN ('Solicitada', 'En estudio', 'Aprobada', 'Rechazada', 'Finalizada'))
);