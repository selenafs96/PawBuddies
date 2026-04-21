import { useState } from 'react';
import { UsersRepository } from '../repositories/usersRepository.js';

export function useUsers() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [numeroVoluntariosProtectora, setNumeroVoluntariosProtectora] = useState(0);

  const fetchUsers = async () => {
    try {
      const data = await UsersRepository.getAll();
      setUsers(data);
      setError(null);
    } catch (err) {
      console.error('Error cargando usuarios:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserById = async (id_usuario) => {
    try {
      const data = await UsersRepository.getById(id_usuario);
      setUsers(data);
      setError(null);
    } catch (err) {
      console.error('Error cargando usuarios:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id, updates) => {
    try {
      const data = await UsersRepository.update(id, updates);
      setUsers((prev) => ({ ...prev, ...updates }));
      setError(null);
      return data;
    } catch (err) {
      console.error('Error actualizando usuario:', err);
      setError(err);
      throw err;
    }
  };

  const deleteUser = async (id) => {
    try {
      await UsersRepository.delete(id);
      setError(null);
    } catch (err) {
      console.error('Error eliminando usuario:', err);
      setError(err);
      throw err;
    }
  };

  const createUser = async (userData) => {
    try {
      const data = await UsersRepository.create(userData);
    } catch (err) {
      console.error('Error creando usuario:', err);
      setError(err);
      throw err;
    }
  };
  
    const fetchNumeroVoluntariosProtectora = async (id_usuario) => {
      try {
        const data = await UsersRepository.getConteoVoluntariosProtectora(id_usuario);
        setNumeroVoluntariosProtectora(data);
        setError(null);
      } catch (err) {
        console.error('Error obteniendo conteo de voluntarios:', err);
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    const fetchRolUsuario = async (id_usuario) => {
      try {
        const data = await UsersRepository.getRolUsuario(id_usuario);
        setError(null);
        return data;
      } catch (err) {
        console.error('Error obteniendo rol de usuario:', err);
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }

    }; 
  
  return { users, loading, fetchUsers, fetchUserById, updateUser, deleteUser, createUser, fetchNumeroVoluntariosProtectora, numeroVoluntariosProtectora, fetchRolUsuario };
}
