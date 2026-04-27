import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';

export default function PerfilTrabajador() {
  const [isSaved, setIsSaved] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleDeny = () => {
    console.log('Denegada');
  };

  const handleSave = () => {
    setIsSaved(true);
    console.log('Guardado');
  };

  return (
    <View style={styles.container}>
      {/* StatusBar */}
      <View style={styles.statusBar}>
        <View style={styles.time}>
          <Text style={styles.time2}>9:41</Text>
        </View>
        <View style={styles.levels}>
          <View style={[styles.battery, styles.borderPosition]}>
            <View style={[styles.border, styles.borderPosition]} />
            <Image style={[styles.capIcon, styles.iconPosition]} resizeMode="cover" />
            <View style={[styles.capacity, styles.borderPosition]} />
          </View>
          <Image style={[styles.wifiIcon, styles.iconPosition]} resizeMode="cover" />
          <Image style={[styles.cellularConnectionIcon, styles.iconPosition]} resizeMode="cover" />
        </View>
      </View>

      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>Detalles de la casa de acogida</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Image style={styles.backIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.denyButton}
          onPress={handleDeny}
          activeOpacity={0.8}
        >
          <Text style={styles.denyText}>X</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image style={styles.heroImage} />
          <View style={styles.ratingBadge}>
            <View style={styles.ratingDots}>
              {[1, 2, 3, 4, 5].map((dot) => (
                <View key={dot} style={styles.dot} />
              ))}
            </View>
          </View>
        </View>

        {/* Información del Trabajador */}
        <View style={styles.workerInfoSection}>
          <Text style={styles.workerName}>Nombre Trabajador</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Ciudad</Text>
              <Text style={styles.infoValue}>Barcelona</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Disponibilidad</Text>
              <Text style={styles.infoValue}>L-V</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Habilidades</Text>
              <Text style={styles.infoValue}>Adiestramiento</Text>
            </View>
          </View>
        </View>

        {/* Sobre Trabajador */}
        <View style={styles.aboutSection}>
          <Text style={styles.sectionTitle}>Sobre trabajador</Text>
          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionText}>
              Figma ipsum component variant main layer. Style boolean italic star pixel mask underline. Union object main slice team align. Ellipse blur pixel fill rotate text.
            </Text>
          </View>
        </View>

        {/* Documentación */}
        <View style={styles.documentationSection}>
          <Text style={styles.sectionTitle}>Documentación</Text>
          <View style={styles.docItem}>
            <Text style={styles.docLabel}>DNI</Text>
            <View style={styles.docFile}>
              <Text style={styles.docFileName}>document.pdf</Text>
              <Image style={styles.docIcon} />
            </View>
          </View>
          <View style={styles.docItem}>
            <Text style={styles.docLabel}>Contato</Text>
            <View style={styles.docFile}>
              <Text style={styles.docFileName}>document.pdf</Text>
              <Image style={styles.docIcon} />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer - Save Button */}
      <View style={styles.footerSection}>
        <TouchableOpacity
          style={[styles.saveButton, isSaved && styles.saveButtonActive]}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>
            {isSaved ? '✓ Guardado' : 'Guardar'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  borderPosition: {
    left: '50%',
    position: 'absolute',
  },
  iconPosition: {
    maxHeight: '100%',
    left: '50%',
    position: 'absolute',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  statusBar: {
    width: '100%',
    height: 41,
    flexDirection: 'row',
    gap: 112,
  },
  time: {
    width: 138,
    height: 54,
  },
  time2: {
    width: '26.81%',
    top: '33.96%',
    left: '36.96%',
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
    fontFamily: 'SF Pro',
    color: '#202020',
    textAlign: 'center',
    position: 'absolute',
  },
  levels: {
    width: 143,
    height: 54,
  },
  battery: {
    height: '24.07%',
    marginLeft: 12,
    top: '42.59%',
    bottom: '33.33%',
    width: 27,
  },
  border: {
    height: '100%',
    marginLeft: -14,
    top: '0%',
    bottom: '0%',
    borderRadius: 4,
    borderStyle: 'solid',
    borderColor: '#202020',
    borderWidth: 1,
    width: 25,
    opacity: 0,
  },
  capIcon: {
    height: '31.54%',
    marginLeft: 12,
    top: '36.78%',
    bottom: '31.68%',
    width: 1,
    opacity: 0,
  },
  capacity: {
    height: '69.23%',
    marginLeft: -12,
    top: '15.38%',
    bottom: '15.38%',
    borderRadius: 3,
    backgroundColor: '#202020',
    width: 21,
  },
  wifiIcon: {
    height: '22.78%',
    marginLeft: -13,
    top: '43.77%',
    bottom: '33.45%',
    width: 17,
  },
  cellularConnectionIcon: {
    height: '22.59%',
    marginLeft: -39,
    top: '43.58%',
    bottom: '33.82%',
    width: 19,
  },
  headerSection: {
    position: 'absolute',
    top: 49,
    left: 0,
    right: 0,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'TiltNeon-Regular',
    color: '#000',
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 27,
    width: 24,
    height: 24,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  denyButton: {
    position: 'absolute',
    right: 27,
    width: 27,
    height: 32,
    backgroundColor: '#BE1447',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  denyText: {
    color: '#fff',
    fontFamily: 'TiltNeon-Regular',
    fontSize: 12,
    fontWeight: '600',
  },
  scrollContent: {
    paddingTop: 120,
    paddingHorizontal: 25,
    paddingBottom: 100,
  },
  heroSection: {
    width: '100%',
    height: 250,
    backgroundColor: '#43B0A7',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#868882',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 7,
  },
  ratingDots: {
    flexDirection: 'row',
    gap: 2,
  },
  dot: {
    width: 5,
    height: 5,
    backgroundColor: '#fff',
    borderRadius: 2.5,
  },
  workerInfoSection: {
    marginBottom: 20,
    gap: 10,
  },
  workerName: {
    fontSize: 16,
    fontFamily: 'Urbanist-SemiBold',
    fontWeight: '600',
    color: '#000',
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  infoBox: {
    flex: 1,
    backgroundColor: '#E8F7F6',
    paddingVertical: 11,
    paddingHorizontal: 12,
    borderRadius: 9,
    gap: 5,
  },
  infoLabel: {
    fontSize: 12,
    fontFamily: 'TiltNeon-Regular',
    color: '#6A6A6A',
  },
  infoValue: {
    fontSize: 12,
    fontFamily: 'TiltNeon-Regular',
    color: '#000',
  },
  aboutSection: {
    marginBottom: 20,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'TiltNeon-Regular',
    color: '#000',
    fontWeight: '600',
  },
  descriptionBox: {
    backgroundColor: '#E8F7F6',
    paddingVertical: 11,
    paddingHorizontal: 12,
    borderRadius: 9,
    minHeight: 88,
  },
  descriptionText: {
    fontSize: 12,
    fontFamily: 'Urbanist-Regular',
    color: '#000',
    lineHeight: 18,
  },
  documentationSection: {
    marginBottom: 20,
    gap: 10,
  },
  docItem: {
    marginBottom: 10,
    gap: 8,
  },
  docLabel: {
    fontSize: 12,
    fontFamily: 'TiltNeon-Regular',
    color: '#6A6A6A',
  },
  docFile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#636363',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    height: 42,
  },
  docFileName: {
    fontSize: 12,
    fontFamily: 'TiltNeon-Regular',
    color: '#AEAEAE',
  },
  docIcon: {
    width: 25,
    height: 24,
  },
  footerSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  saveButton: {
    width: 238,
    height: 43,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#43B0A7',
  },
  saveButtonActive: {
    backgroundColor: '#43B0A7',
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: 'TiltWarp-Regular',
    color: '#43B0A7',
    fontWeight: '600',
  },
});