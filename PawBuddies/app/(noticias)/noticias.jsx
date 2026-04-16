import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import FilterTabs from '../../src/components/FilterTabs';
import NewsCard from '../../src/components/NewsCard';
import NewsHeader from '../../src/components/NewsHeader';
import { BottomNav } from '../../src/components/BottomNav';

export default function Noticias() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('news');
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const mockNews = [
    {
      id: 1,
      titulo: 'Adorable Pup Looking for a Loving Home!',
      categoria: 'Adoption',
      autor: 'Nombre Apellido',
      rol: 'Persona de acogida',
      descripcion:
        'He encontrado este perro en ipsum component variant main layer. Style boolean italic star pixel mask underline. Union object main slice team align. Ellipse blur pixel fill...',
      likes: 234,
      comentarios: 45,
    },
    {
      id: 2,
      titulo: 'Found: Adorable Pup Looking for a Loving Home!',
      categoria: 'Lost & Found',
      autor: 'Nombre Apellido',
      rol: 'Persona de acogida',
      descripcion:
        'I found this sweet dog and am looking for a loving home for them. If you\'re ready to welcome a new furry friend into your life, this adorable pup is waiting to bring joy and...',
      likes: 567,
      comentarios: 89,
    },
    {
      id: 3,
      titulo: 'New Pet Care Tips for Spring',
      categoria: 'News',
      autor: 'Nombre Apellido',
      rol: 'Persona de acogida',
      descripcion:
        'Spring is here and it\'s time to prepare your pets for the season. Learn about the best practices and tips to keep your furry friends healthy and happy.',
      likes: 892,
      comentarios: 156,
    },
    {
      id: 4,
      titulo: 'How to Adopt Your First Pet',
      categoria: 'Articles',
      autor: 'Nombre Apellido',
      rol: 'Persona de acogida',
      descripcion:
        'A complete guide for first-time pet owners. Everything you need to know before bringing home your new companion.',
      likes: 345,
      comentarios: 67,
    },
    {
      id: 5,
      titulo: 'Missing: Golden Retriever',
      categoria: 'Lost & Found',
      autor: 'Nombre Apellido',
      rol: 'Persona de acogida',
      descripcion:
        'Lost dog in the city center. If you see a golden retriever with a blue collar, please contact us immediately. Any information appreciated!',
      likes: 234,
      comentarios: 89,
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setNews(mockNews);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredNews = news.filter((item) =>
    selectedFilter === 'All' ? true : item.categoria === selectedFilter
  );

  const handleLike = (id) => {
    setNews(
      news.map((item) =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#43B0A7" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <NewsHeader />
        <FilterTabs
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredNews.map((item) => (
          <NewsCard
            key={item.id}
            item={item}
            onLike={() => handleLike(item.id)}
          />
        ))}
      </ScrollView>

      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#43B0A7',
  },
  header: {
    backgroundColor: '#43B0A7',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#43B0A7',
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: '#43B0A7',
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingBottom: 120,
  },
});