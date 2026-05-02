import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FilterTabs({ selectedFilter, onFilterChange }) {
  const filters = [
    { label: 'All' },
    { label: 'Adoption' },
    { label: 'News' },
    { label: 'Articles' },
    { label: 'Lost & Found' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            { justifyContent: 'center', flexGrow: 1 }
          ]}
      >
        {filters.map((filter) => {
          const isActive = selectedFilter === filter.label;
          return (
            <TouchableOpacity
              key={filter.label}
              onPress={() => onFilterChange(filter.label)}
              style={[
                styles.button,
                {
                  backgroundColor: isActive ? '#177D76' : '#E8F7F6',
                },
              ]}
            >
              <Text
                style={[
                  styles.text,
                  {
                    color: isActive ? '#FFFFFF' : '#000000',
                  },
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#43B0A7',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  scrollContent: {
    gap: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'TiltNeon',
    fontSize: 14,
  },
});