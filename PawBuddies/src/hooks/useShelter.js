import { useState } from 'react';
import { ShelterRepository } from '../repositories/shelterRepository.js';

export function useShelter() {
  const [shelters, setShelters] = useState([]);
  const [shelterLoading, setShelterLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchShelters = async () => {
    try {
      const data = await ShelterRepository.getAll();
      setShelters(data);
      setError(null);
    } catch (err) {
      console.error('Error cargando protectoras:', err);
      setError(err);
    } finally {
      setShelterLoading(false);
    }
  };

  const fetchShelterById = async (id) => {
    try {
      const data = await ShelterRepository.getById(id);
      setShelters(data);
      setError(null);
    } catch (err) {
      console.error('Error cargando protectoras:', err);
      setError(err);
    } finally {
      setShelterLoading(false);
    }
  };

  return { shelters, shelterLoading, fetchShelters, fetchShelterById };
}
