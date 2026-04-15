import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Checkbox from 'expo-checkbox';
import { scaleFont, scaleSize } from '../constants/layout';

export default function MyCheckBox({ tag }) {
  const [isChecked, setIsChecked] = useState(false);
  const [cantidad, setCantidad] = useState('');

  return (
    <View style={styles.mainContainer}>
      <View style={styles.checkboxContainer}>
        <Checkbox
          style={[styles.checkbox]}
          value={isChecked}
          onValueChange={setIsChecked}
          color={isChecked ? '#3DBDB0' : undefined}
        />
        <Text style={styles.tagText}>{tag}</Text>
      </View>
      {isChecked && (
        <View style={styles.cantidadContainer}>
          <TextInput
            style={styles.input}
            placeholder="¿Cuántos?"
            value={cantidad}
            onChangeText={setCantidad}
            keyboardType="numeric"
            returnKeyType="done"
            textAlignVertical="top"
            placeholderTextColor={'#666666'}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {},
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: scaleSize(10),
    marginBottom: scaleSize(10),
  },
  input: {
    flex: 1,
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(14),
    height: scaleSize(160),
    outlineStyle: 'none',
    boxShadow: 'none',
  },
  checkbox: {
    width: scaleSize(18),
    height: scaleSize(18),
  },
  textoMascota: {
    fontFamily: 'TiltNeon',
  },
  cantidadContainer: {
    justifyContent: 'center',
    borderWidth: 1,
    padding: 10,
    borderColor: '#222222',
    borderRadius: scaleSize(10),
    paddingHorizontal: scaleSize(12),
    height: 'auto',
    width: scaleSize(89),
    marginBottom: scaleSize(15),
  },
});
