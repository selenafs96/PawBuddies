import { useState } from 'react';
import { AnimalRepository } from '../repositories/animalRepository.js';

export function useAnimals(filtro = 'todos') {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnimals = async () => {
    try {
      const data = await AnimalRepository.getAll();
      setAnimals(data);
      setError(null);
    } catch (err) {
      console.error('Error cargando animales:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnimalById = async (id) => {
    try {
      const data = await AnimalRepository.getById(id);
      setAnimals(data);
      setError(null);
    } catch (err) {
      console.error('Error cargando animales:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

    const fetchAnimalByEspecieEstado = async (especie, estado) => {
    try {
      const data = await AnimalRepository.getByEspecieEstado(especie, estado);
      setAnimals(data);
      setError(null);
    } catch (err) {
      console.error('Error cargando animales:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { animals, loading, fetchAnimals, fetchAnimalById, fetchAnimalByEspecieEstado };
}
