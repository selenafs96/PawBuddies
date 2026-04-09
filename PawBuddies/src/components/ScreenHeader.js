import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackButton } from './BackButton';
import { StyleSheet, Text, View } from 'react-native';
import { scaleFont, scaleSize } from '../constants/layout';

export default function ScreenHeader({title}) {
  const insets = useSafeAreaInsets();
  const styles = createStyles(insets);

  return (
      <View style={styles.titleContainer}>
        <View style={styles.leftColumn}>
          <BackButton />
        </View>
        <View style={styles.centerColumn}>
          <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.7}>{title}</Text>
        </View>
        <View style={styles.rightColumn} />
      </View>
  );
}

const createStyles = (insets) =>
  StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: insets.top,
      paddingHorizontal: scaleSize(5),
      width: '100%',
    },
    leftColumn: {
      flex: 1,
      alignItems: 'flex-start',
    },
    centerColumn: {
      flex: 2, // Le damos más espacio al centro
      alignItems: 'center',
    },
    rightColumn: {
      flex: 1, // Espacio vacío para equilibrar el flex
    },
    title: {
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(20),
    },
  });
