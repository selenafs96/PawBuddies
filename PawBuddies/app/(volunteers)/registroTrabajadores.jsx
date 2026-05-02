import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';

export default function RegistroTrabajadores() {
  const [searchFilter, setSearchFilter] = useState('');
  const [workers, setWorkers] = useState([
    {
      id: 1,
      name: 'Nombre Trabajador',
      type: 'Trabajador',
      image: null,
      status: 'active',
    },
    {
      id: 2,
      name: 'Nombre Voluntario',
      type: 'Voluntario',
      image: null,
      status: 'active',
    },
    {
      id: 3,
      name: 'Nombre Trabajador',
      type: 'Trabajador',
      image: null,
      status: 'active',
    },
    {
      id: 4,
      name: 'Husky',
      type: 'Animal',
      distance: 'Distance 700m',
      image: null,
      status: 'active',
      backgroundColor: '#E8F7F6',
    },
  ]);

  const handleDenyWorker = (id) => {
    setWorkers(workers.filter(worker => worker.id !== id));
  };

  const handleSave = () => {
    console.log('Registro guardado');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* StatusBar */}
      <View style={styles.statusBar}>
        <View style={styles.time}>
          <Text style={styles.time2}>9:41</Text>
        </View>
        <View style={styles.levels}>
          <View style={styles.battery}>
            <View style={styles.border} />
            <Image style={[styles.capIcon, styles.iconPosition]} resizeMode="cover" />
            <View style={[styles.capacity, styles.capacityLayout]} />
          </View>
          <Image style={[styles.wifiIcon, styles.iconPosition]} resizeMode="cover" />
          <Image style={[styles.cellularConnectionIcon, styles.iconPosition]} resizeMode="cover" />
        </View>
      </View>

      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>Registro de trabjadores</Text>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Image style={styles.menuIcon} />
        </TouchableOpacity>
      </View>

      {/* Background Teal */}
      <View style={styles.tealBackground} />

      {/* Search Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <Image style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Protectoras"
            placeholderTextColor="#848484"
            value={searchFilter}
            onChangeText={setSearchFilter}
          />
        </View>
      </View>

      {/* Workers List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {workers.map((worker) => (
          <View
            key={worker.id}
            style={[
              styles.workerCard,
              worker.backgroundColor && { backgroundColor: worker.backgroundColor },
            ]}
          >
            {/* Worker Image */}
            <View style={styles.workerImageContainer}>
              <Image style={styles.workerImage} />
            </View>

            {/* Details Button */}
            <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>Detalles</Text>
            </TouchableOpacity>

            {/* Worker Info */}
            <Text style={styles.workerName}>{worker.name}</Text>
            <Text style={styles.workerType}>
              {worker.distance || worker.type}
            </Text>

            {/* Deny Button */}
            <TouchableOpacity
              style={styles.denyButton}
              onPress={() => handleDenyWorker(worker.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.denyText}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Footer - Save Button */}
      <View style={styles.footerSection}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconPosition: {
    maxHeight: '100%',
    left: '50%',
    position: 'absolute',
  },
  capacityLayout: {
    borderRadius: 3,
    position: 'absolute',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  statusBar: {
    marginLeft: -196,
    gap: 112,
    flexDirection: 'row',
    top: 0,
    height: 54,
    left: '50%',
    width: 393,
    position: 'absolute',
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
    left: '50%',
    position: 'absolute',
  },
  border: {
    height: '100%',
    marginLeft: -14,
    top: '0%',
    bottom: '0%',
    borderRadius: 4,
    borderColor: '#202020',
    width: 25,
    opacity: 0,
    borderWidth: 1,
    borderStyle: 'solid',
    left: '50%',
    position: 'absolute',
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
    backgroundColor: '#202020',
    width: 21,
    left: '50%',
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
    top: 48,
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
  menuButton: {
    position: 'absolute',
    right: 27,
    width: 30,
    height: 30,
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
  tealBackground: {
    position: 'absolute',
    top: 81,
    left: 0,
    right: 0,
    height: 771,
    backgroundColor: '#43B0A7',
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    zIndex: 0,
  },
  searchContainer: {
    position: 'absolute',
    top: 85,
    left: 25,
    right: 25,
    height: 52,
    zIndex: 5,
  },
  searchInputWrapper: {
    flex: 1,
    height: 42,
    borderRadius: 10,
    borderColor: '#636363',
    borderWidth: 1,
    backgroundColor: '#E8F7F6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    gap: 5,
  },
  searchIcon: {
    width: 18,
    height: 18,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'TiltNeon-Regular',
    fontSize: 14,
    color: '#848484',
    padding: 0,
  },
  scrollContent: {
    paddingTop: 150,
    paddingHorizontal: 25,
    paddingBottom: 100,
  },
  workerCard: {
    width: '100%',
    height: 186,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 5,
    overflow: 'hidden',
    position: 'relative',
  },
  workerImageContainer: {
    width: '100%',
    height: 136,
    backgroundColor: '#D0D0D0',
    overflow: 'hidden',
  },
  workerImage: {
    width: '100%',
    height: '100%',
  },
  detailsButton: {
    position: 'absolute',
    top: 157,
    right: 20,
    backgroundColor: '#16A99F',
    paddingHorizontal: 22,
    paddingVertical: 2,
    borderRadius: 9,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsButtonText: {
    fontSize: 12,
    fontFamily: 'TiltNeon-Regular',
    color: '#fff',
    textAlign: 'center',
  },
  workerName: {
    position: 'absolute',
    top: 143,
    left: 22,
    fontSize: 12,
    fontFamily: 'TiltWarp-Regular',
    color: '#000',
  },
  workerType: {
    position: 'absolute',
    top: 160,
    left: 22,
    fontSize: 12,
    fontFamily: 'TiltNeon-Regular',
    color: '#696969',
  },
  denyButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 27,
    height: 32,
    backgroundColor: '#BE1447',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  denyText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'TiltNeon-Regular',
    fontWeight: '600',
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
  saveButtonText: {
    fontSize: 16,
    fontFamily: 'TiltWarp-Regular',
    color: '#43B0A7',
    fontWeight: '600',
  },
});