import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scaleFont, scaleSize } from '../constants/layout';

export default function StatCard({ number, stat }) {
  const insets = useSafeAreaInsets();
  const styles = createStyles(insets);

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.number}>{number}</Text>
      <Text style={styles.stat}>{stat}</Text>
    </View>
  );
}

const createStyles = (insets) =>
  StyleSheet.create({
    cardContainer: {
      paddingBottom: scaleSize(10),
      paddingTop: scaleSize(10),
      paddingLeft: scaleSize(15),
      paddingRight: scaleSize(15),
      backgroundColor: '#e8f7f6',
      borderWidth: scaleSize(2),
      borderColor: '#3DBDB0',
      borderRadius: scaleSize(10),
      width: '30%',
      height: '100%',
      alignItems: 'center',
      alignContent: 'center',
    },
    number: {
      color: '#666666',
      fontWeight: 'bold',
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(40),
    },
    stat: {
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(16),
      color: '#666666',
    },
  });
