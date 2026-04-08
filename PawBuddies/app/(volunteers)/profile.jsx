import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackButton } from '../../src/components/BackButton';
import { scaleFont, scaleSize } from '../../src/constants/layout';
import ScreenHeader from '../../src/components/ScreenHeader';
import ImageNameEmailVolunteerCard from '../../src/components/ImageNameEmailVolunteerCard';

export default function VolunteerProfile() {
  const insets = useSafeAreaInsets();
  const styles = createStyles(insets);

  return (
    <View style={styles.mainContainer}>
        <ScreenHeader title='Perfil'/>
        <ImageNameEmailVolunteerCard />
    </View>

  );
}

const createStyles = (insets) =>
  StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: '100%'
    }
  });
