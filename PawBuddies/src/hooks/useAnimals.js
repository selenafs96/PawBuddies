import { useState } from 'react';
import { AnimalRepository } from '../repositories/animalRepository.js';

export function useAnimals(filtro = 'todos') {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [numeroPerrosProtectora, setNumeroPerrosProtectora] = useState(0);
  const [numeroGatosProtectora, setNumeroGatosProtectora] = useState(0);

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
      return data;
    } catch (err) {
      console.error('Error cargando animales:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnimalByEspecieProtectora = async (especie, id_protectora) => {
    try {
      const data = await AnimalRepository.getByEspecieProtectora(especie, id_protectora);
      setAnimals(data);
      setError(null);
      return data;
    } catch (err) {
      console.error('Error cargando animales:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateAnimal = async (id, updates) => {
    try {
      const data = await AnimalRepository.update(id, updates);
      setAnimals((prev) => ({ ...prev, ...updates }));
      setError(null);
      return data;
    } catch (err) {
      console.error('Error actualizando animal:', err);
      setError(err);
      throw err;
    }
  };

  const addAnimal = async(newAnimal) => {
    try {
      const data = await AnimalRepository.add(newAnimal);
      setAnimals((prev) => ({...prev, ...newAnimal}));
      setError(null);
      return data;
    } catch (err) {
      console.error('Error añadiendo animal: ', err);
      setError(err);
      throw err;
    }
  }

  const deleteAnimal = async (id) => {
    try {
      await AnimalRepository.delete(id);
      setError(null);
    } catch (err) {
      console.error('Error eliminando animal:', err);
      setError(err);
      throw err;
    }
  };

  const fetchNumeroPerrosProtectora = async (id_usuario) => {
    try {
      const data = await AnimalRepository.getConteoPerrosProtectora(id_usuario);
      setNumeroPerrosProtectora(data);
      setError(null);
    } catch (err) {
      console.error('Error obteniendo conteo de perros:', err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchNumeroGatosProtectora = async (id_usuario) => {
    try {
      const data = await AnimalRepository.getConteoGatosProtectora(id_usuario);
      setNumeroGatosProtectora(data);
      setError(null);
    } catch (err) {
      console.error('Error obteniendo conteo de gatos:', err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    animals,
    loading,
    fetchAnimals,
    fetchAnimalById,
    fetchAnimalByEspecieEstado,
    fetchAnimalByEspecieProtectora,
    updateAnimal,
    deleteAnimal,
    fetchNumeroPerrosProtectora,
    numeroPerrosProtectora,
    fetchNumeroGatosProtectora,
    numeroGatosProtectora,
    addAnimal,
  };
}
