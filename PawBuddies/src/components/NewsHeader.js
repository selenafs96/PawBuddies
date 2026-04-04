import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function NewsHeader() {
  return (
    <View style={styles.container}>
      {/* Status Bar - Frame 241 */}
      <View style={styles.statusBar}>
        {/* Time - Left side */}
        <Text style={styles.time}>9:41</Text>

        {/* Right side - Levels (WiFi, Cellular, Battery) */}
        <View style={styles.levelsContainer}>
          {/* Cellular Connection */}
          <MaterialCommunityIcons 
            name="signal-cellular-3" 
            size={16} 
            color="#202020" 
          />

          {/* WiFi */}
          <MaterialCommunityIcons 
            name="wifi" 
            size={16} 
            color="#202020" 
          />

          {/* Battery */}
          <View style={styles.batteryContainer}>
            <View style={styles.batteryBorder}>
              <View style={styles.batteryCapacity} />
            </View>
            <View style={styles.batteryCap} />
          </View>
        </View>
      </View>

      {/* Title area - Noticias */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Noticias</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#43B0A7',
    paddingTop: 0,
    paddingBottom: 20,
    width: '100%',
  },
  statusBar: {
    // Status Bar Container
    width: '100%',
    height: 54,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  time: {
    // Time text
    fontFamily: 'SF Pro',
    fontWeight: '590',
    fontSize: 17,
    lineHeight: 22,
    textAlign: 'center',
    color: '#202020',
  },
  levelsContainer: {
    // Right side icons (Cellular, WiFi, Battery)
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    height: 54,
    justifyContent: 'center',
  },
  batteryContainer: {
    // Battery icon container
    width: 28,
    height: 14,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  batteryBorder: {
    // Battery border
    width: 25,
    height: 12,
    borderWidth: 1,
    borderColor: '#202020',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 2,
    opacity: 0.35,
  },
  batteryCapacity: {
    // Battery filled portion
    width: 18,
    height: 8,
    backgroundColor: '#202020',
    borderRadius: 1,
  },
  batteryCap: {
    // Battery cap (small notch at right)
    position: 'absolute',
    right: -3,
    width: 1.5,
    height: 6,
    backgroundColor: '#202020',
    borderRadius: 0.5,
    opacity: 0.4,
  },
  titleContainer: {
    // Contenedor del título - CENTRADO
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {
    // Noticias title
    fontFamily: 'Tilt Neon',
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 23,
    color: '#000000',
    textAlign: 'center',
  },
});