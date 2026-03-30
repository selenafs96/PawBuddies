import { View, Text, StyleSheet } from 'react-native';
import { scaleFont, scaleSize } from '../constants/layout';

export const DataCard = ({ category, data, style, unidad_medida }) => {
  
  if(!unidad_medida) {
    unidad_medida = ""
  }

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.data}>{`${data} ${unidad_medida}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  category: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(14),
    color: '#878a8a',
  },
  data: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(16),
    color: '#000000',
  },
  container: {
    paddingBottom: scaleSize(5),
    paddingTop: scaleSize(10),
    paddingLeft: scaleSize(15),
    paddingRight: scaleSize(15),
    backgroundColor: '#e8f7f6',
    borderRadius: scaleSize(10),
    minWidth: '28%',
    height: '100%',
    alignItems: 'start',
    alignContent: 'center',
  },
});
