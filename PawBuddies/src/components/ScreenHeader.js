import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackButton } from './BackButton';
import { StyleSheet, Text, View } from 'react-native';
import { scaleFont, scaleSize } from '../constants/layout';

export default function ScreenHeader({ title }) {
  const insets = useSafeAreaInsets();
  const styles = createStyles(insets);

  return (
    <View style={styles.titleContainer}>
      <View style={styles.leftColumn}>
        <BackButton />
      </View>
      <View style={styles.centerColumn}>
        <Text
          style={styles.title}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.7}
        >
          {title}
        </Text>
      </View>
      <View style={styles.rightColumn} />
    </View>
  );
}

const createStyles = (insets) =>
  StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: insets.top,
      width: '100%',
    },
    leftColumn: {
      width: '20%',
      zIndex: 1,
    },

    centerColumn: {
      width: '60%',
      alignItems: 'center',
      zIndex: 1,
    },

    rightColumn: {
      width: '20%',
      zIndex: 1,
    },
    title: {
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(20),
      maxWidth: '80%', // evita que choque con botones
    },
  });
