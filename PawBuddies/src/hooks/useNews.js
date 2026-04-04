import { useState } from 'react';
import { NewsRepository } from '../repositories/newsRepository.js';

export function useNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    try {
      const data = await NewsRepository.getAll();
      setNews(data);
      setError(null);
    } catch (err) {
      console.error('Error cargando noticias:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { news, loading, fetchNews, error };
}
