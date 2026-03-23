import { View, Text, StyleSheet } from 'react-native';
import { scaleFont } from '../constants/layout';

export const DataCard = ({ category, data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.data}>{data}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  category: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(15),
    color: '#878a8a',
  },
  data: {
    fontFamily: 'TiltNeon',
    fontSize: scaleFont(18),
    color: '#000000',
  },
  container: {
    marginLeft: 10,
    paddingBottom: 15,
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#e8f7f6',
    borderRadius: 10,
    width: '30%',
    height: '10%',
    alignItems: 'start',
    alignContent: 'center',
  },
});
