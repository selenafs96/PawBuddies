import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { scaleFont, scaleSize } from '../constants/layout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileMenuItem({action, onPress}) {
  
  const insets = useSafeAreaInsets();
  const styles = createStyles(insets);

  return (
    <TouchableOpacity style={styles.mainContainer} onPress={onPress}>
      <Text style={styles.action}>{action}</Text>
      <Image source={require('../../assets/icons/arrow_continue.png')}/>
    </TouchableOpacity>
  );
}

const createStyles = (insets) =>
  StyleSheet.create({
    mainContainer: {
      flexDirection: 'row',
      width: '100%',
      backgroundColor: '#e8f7f6',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: scaleSize(5),
      paddingBottom: scaleSize(5)
    },
    action: {
        fontFamily: 'TiltNeon',
        fontSize: scaleFont(16)
    }
  });
