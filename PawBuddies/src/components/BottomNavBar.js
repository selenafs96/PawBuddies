import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function BottomNavBar({ activeTab, onTabChange }) {
  const tabs = [
    { name: 'home', icon: 'home', iconOutline: 'home-outline', label: 'Inicio' },
    { name: 'paw', icon: 'paw', iconOutline: 'paw-outline', label: 'Mascotas' },
    { name: 'heart', icon: 'heart', iconOutline: 'heart-outline', label: 'Favoritos' },
    { name: 'profile', icon: 'account', iconOutline: 'account-outline', label: 'Perfil' },
  ];

  return (
    <View style={styles.container}>
      {/* Frame 241 - Bottom Navigation */}
      <View style={styles.navBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.name}
            style={styles.navItem}
            onPress={() => onTabChange(tab.name)}
            activeOpacity={0.7}
          >
            {/* Circle background for active tab */}
            {activeTab === tab.name && (
              <View style={styles.activeCircle} />
            )}
            <MaterialCommunityIcons
              name={activeTab === tab.name ? tab.icon : tab.iconOutline}
              size={24}
              color={activeTab === tab.name ? '#FFFFFF' : '#43B0A7'}
              style={styles.icon}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Frame 241 - Container
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    paddingBottom: 16,
  },
  navBar: {
    // Frame 145 - Navigation Bar
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 238,
    height: 43,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 40,
    gap: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  navItem: {
    width: 29,
    height: 29,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  activeCircle: {
    // Ellipse 17 - Active indicator circle
    position: 'absolute',
    width: 29,
    height: 29,
    borderRadius: 14.5,
    backgroundColor: '#43B0A7',
    zIndex: 0,
  },
  icon: {
    zIndex: 1,
  },
});