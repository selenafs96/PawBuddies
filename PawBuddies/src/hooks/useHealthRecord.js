import { useState } from 'react';
import { HealthRecordRepository } from '../repositories/healthRecordRepository';

export function useHealthRecord() {
  const [healthRecords, setHealthRecords] = useState([]);
  const [healthRecordLoading, setHealthRecordLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHealthRecords = async () => {
    try {
      const data = await HealthRecordRepository.getAll();
      setHealthRecords(data);
      setError(null);
    } catch (err) {
      console.error('Error cargando fichas sanitarias:', err);
      setError(err);
    } finally {
      setHealthRecordLoading(false);
    }
  };

  const fetchHealthRecordById = async (id) => {
    try {
      const data = await HealthRecordRepository.getByAnimalId(id);
      setHealthRecords(data);
      setError(null);
    } catch (err) {
      console.error('Error cargando fichas sanitarias:', err);
      setError(err);
    } finally {
      setHealthRecordLoading(false);
    }
  };

  return { healthRecords, healthRecordLoading, fetchHealthRecords, fetchHealthRecordById };
}
