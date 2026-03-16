CREATE TABLE protectora (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  cif TEXT UNIQUE NOT NULL,
  telefono_contacto TEXT NOT NULL,
  email_contacto TEXT UNIQUE NOT NULL,
  provincia TEXT NOT NULL,
  localidad TEXT NOT NULL,
  calle TEXT NOT NULL,
  numero TEXT NOT NULL,
  codigo_postal TEXT NOT NULL,
  presentacion TEXT
)

INSERT INTO protectora (
  nombre, 
  cif, 
  telefono_contacto, 
  email_contacto, 
  provincia, 
  localidad, 
  calle, 
  numero, 
  codigo_postal, 
  presentacion
) VALUES (
  'Protectora PawBuddies', 
  'B12345678', 
  '+34600111222', 
  'contacto@pawbuddies.org', 
  'Madrid', 
  'Getafe', 
  'Calle de la Esperanza', 
  '14', 
  '28901', 
  'Somos una protectora dedicada al rescate de perros y gatos en la zona sur de Madrid.'
);