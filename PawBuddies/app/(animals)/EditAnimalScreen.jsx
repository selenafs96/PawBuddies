import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { scaleFont, scaleSize } from '../constants/layout.js';
import AnimalImagesCarousel from '../components/AnimalImagesCarousel.js';
import DataCard from '../components/DataCard.js';

import { useAnimals } from '../hooks/useAnimals.js';

export default function EditAnimalScreen({ id_animal }) {
  const insets = useSafeAreaInsets();
  const styles = createStyles(insets);

  const { animals, fetchAnimalById, updateAnimal } = useAnimals();

  // 🔹 Estado editable
  const [form, setForm] = useState(null);

  // 🔹 Fetch
  useEffect(() => {
    if (id_animal) {
      fetchAnimalById(id_animal);
    }
  }, [id_animal]);

  // 🔹 Cargar datos en el form
  useEffect(() => {
    if (animals) {
      setForm({
        nombre: animals.nombre || '',
        genero: animals.genero || '',
        edad: animals.edad?.toString() || '',
        tamano: animals.tamano || '',
        presentacion: animals.presentacion || '',
      });
    }
  }, [animals]);

  // 🔹 Handler genérico
  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 🔹 Guardar cambios
  const handleSave = () => {
    const updatedAnimal = {
      ...animals,
      ...form,
      edad: parseInt(form.edad),
    };

    updateAnimal(updatedAnimal);
    alert('Cambios guardados');
  };

  if (!form) {
    return (
      <View style={styles.center}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Detalles del animal</Text>
          <Text style={styles.close}>✕</Text>
        </View>

        {/* Carrusel */}
        <AnimalImagesCarousel imageUrls={animals.url_foto} />

        {/* Bloque turquesa */}
        <View style={styles.tealBlock}>

          {/* Nombre */}
          <Text style={styles.sectionTitle}>Nombre</Text>

          <View style={styles.row}>
            <InputCard
              label="Género"
              value={form.genero}
              onChange={(v) => handleChange('genero', v)}
            />
            <InputCard
              label="Edad"
              value={form.edad}
              onChange={(v) => handleChange('edad', v)}
            />
            <InputCard
              label="Tamaño"
              value={form.tamano}
              onChange={(v) => handleChange('tamano', v)}
            />
          </View>

          {/* Sobre el animal */}
          <Text style={styles.sectionTitle}>Sobre el animal</Text>

          <TextInput
            style={styles.textArea}
            multiline
            value={form.presentacion}
            onChangeText={(v) => handleChange('presentacion', v)}
          />

          {/* Botón guardar */}
          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveText}>Guardar</Text>
          </Pressable>

        </View>
      </ScrollView>
    </View>
  );
}