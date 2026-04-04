import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

import { scaleFont, scaleSize } from '../src/constants/layout';
import { Stack } from 'expo-router';
import { BackButton } from '../src/components/BackButton';
import { BottomNav } from '../src/components/BottomNav';

export default function DetalleNoticia() {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#3DBDB0',
      borderBottomLeftRadius: scaleSize(14),
      borderBottomRightRadius: scaleSize(14),
      paddingBottom: scaleSize(100),
    },

    titleContainer: {
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: scaleSize(20),
      paddingTop: scaleSize(10),
      paddingBottom: scaleSize(10),
    },

    title: {
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(18),
    },

    headerImage: {
      width: '100%',
      height: scaleSize(220),
      borderBottomRightRadius: scaleSize(10),
      borderBottomLeftRadius: scaleSize(10)
    },

    floatingBtn: {
      position: 'absolute',
      top: scaleSize(20),
      right: scaleSize(20),
      //backgroundColor: '#3DBDB0',
      padding: scaleSize(10),
      borderRadius: scaleSize(50),
    },

    floatingBtnLeft: {
      position: 'absolute',
      top: scaleSize(20),
      left: scaleSize(20),
      //backgroundColor: '#3DBDB0',
      padding: scaleSize(10),
      borderRadius: scaleSize(50),
    },

    dots: {
      position: 'absolute',
      bottom: scaleSize(10),
      alignSelf: 'center',
      backgroundColor: '#888',
      borderRadius: scaleSize(10),
      paddingHorizontal: scaleSize(6),
      paddingVertical: scaleSize(2),
    },

    titleCard: {
      backgroundColor: '#FFFFFF',
      marginHorizontal: scaleSize(16),
      marginTop: scaleSize(-20),
      padding: scaleSize(14),
      borderRadius: scaleSize(20),
      flexDirection: 'row',
      alignItems: 'center',
      gap: scaleSize(10),
    },

    avatar: {
      width: scaleSize(40),
      height: scaleSize(40),
      borderRadius: scaleSize(20),
    },

    title: {
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(14),
      fontWeight: '600',
      color: '#222',
    },

    subtitle: {
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(12),
      color: '#888',
    },

    contentCard: {
      backgroundColor: '#FFFFFF',
      marginHorizontal: scaleSize(16),
      marginTop: scaleSize(7),
      padding: scaleSize(14),
      borderRadius: scaleSize(10),
    },

    text: {
      fontFamily: 'TiltNeon',
      fontSize: scaleFont(13),
      color: '#222',
      lineHeight: scaleSize(18),
    },

    commentCard: {
      backgroundColor: '#FFFFFF',
      marginHorizontal: scaleSize(16),
      marginLeft: scaleSize(45),
      marginTop: scaleSize(7),
      padding: scaleSize(14),
      borderRadius: scaleSize(10),
      borderTopLeftRadius: scaleSize(0)
    },

    bottomNav: {
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      borderRadius: scaleSize(50),
      position: 'absolute',
      bottom: scaleSize(6),
      left: scaleSize(70),
      right: scaleSize(70),
      height: scaleSize(50),
      paddingVertical: scaleSize(6),
      paddingHorizontal: scaleSize(16),
      justifyContent: 'space-around',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: scaleSize(-1) },
      shadowOpacity: 0.06,
      shadowRadius: scaleSize(5),
      elevation: 4,
    },

    navItem: {
      padding: scaleSize(6),
      borderRadius: scaleSize(14),
      alignItems: 'center',
      justifyContent: 'center',
    },

    navActivo: {
      backgroundColor: '#3DBDB0',
      borderRadius: scaleSize(34),
      width: scaleSize(34),
      height: scaleSize(34),
    },

    bottomIconoImg: {
      width: scaleSize(18),
      height: scaleSize(18),
      resizeMode: 'contain',
    },

    bottomIconoImgActivo: {
      width: scaleSize(18),
      height: scaleSize(18),
      resizeMode: 'contain',
      tintColor: '#FFFFFF',
    },

    topBar: {
      position: 'absolute',
      top: scaleSize(50),
      left: scaleSize(20),
      right: scaleSize(20),
      flexDirection: 'row',
      justifyContent: 'space-between',
      zIndex: 10,
    },

    topIcon: {
      color: '#FFFFFF',
      fontSize: scaleFont(18),
    },

    favButton: {
      width: scaleSize(34),
      height: scaleSize(34),
      resizeMode: 'contain',
    },

    shareButton: {
      width: scaleSize(24),
      height: scaleSize(24),
      resizeMode: 'contain',
    },
});

  return (

    <View style={{ flex: 1, backgroundColor: '#3DBDB0' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: scaleSize(120),
        }}
      >

        <View style={styles.titleContainer}>
          <BackButton />
          <Text style={styles.title}>Noticia</Text>

          <TouchableOpacity>
            <Image
              source={require('../assets/icons/share.png')}
              style={styles.shareButton}
            />
          </TouchableOpacity>
        </View>

          {/* HEADER */}
          <View>
            <Image
              source={{ uri: 'https://picsum.photos/600/400' }}
              style={styles.headerImage}
            />

            <TouchableOpacity style={styles.floatingBtnLeft}>
              <Image
                source={require('../assets/icons/megusta.png')}
                style={styles.favButton}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.floatingBtn}>
              <Image
                source={require('../assets/icons/guardar.png')}
                style={styles.favButton}
              />
            </TouchableOpacity>

            <View style={styles.dots}>
              <Text style={{ color: '#fff' }}>•••••</Text>
            </View>
          </View>

          {/* CONTENIDO */}
          <View style={styles.container}>

            {/* TÍTULO NOTICIA */}
            <View style={styles.titleCard}>
              <Image
                source={{ uri: 'https://picsum.photos/100' }}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.title}>
                  Título de la noticia
                </Text>
                <Text style={styles.subtitle}>
                  Subtítulo / categoría
                </Text>
              </View>
            </View>

            {/* TEXTO */}
            <View style={styles.contentCard}>
              <Text style={styles.text}>
                Figma ipsum component variant main layer. Style boolean italic star pixel mask underline. Union object main slice team align. Ellipse blur pixel fill rotate text. Duplicate inspect figma scale content move edit distribute asset. Inspect union create opacity strikethrough. Rectangle layout ipsum selection line connection export italic ipsum. Asset polygon rectangle component vertical invite pen ipsum. Duplicate hand comment editor star community strikethrough rotate share polygon. Content asset duplicate team strikethrough link fill.
              </Text>
            </View>

            {/* COMENTARIOS */}
            {[1, 2, 3].map((item) => (

              <View key={item} style={styles.commentCard}>
                <View style={{ flexDirection: 'row', gap: scaleSize(10) }}>
                  
                  <Image
                    source={{ uri: 'https://picsum.photos/100' }}
                    style={styles.avatar}
                  />

                  <View style={{ flex: 1 }}>
                    <Text style={styles.title}>Nombre Apellido {item}</Text>
                    <Text style={styles.subtitle}>Persona adoptante</Text>

                    <Text style={styles.text}>
                      Figma ipsum component variant main layer. Style boolean italic star pixel mask underline. Union object main slice team align. Ellipse blur pixel fill rotate text. 
                    </Text>
                  </View>

                </View>
              </View>
            ))}

          </View>

        </ScrollView>

      {/* Bottom Nav */}
      <BottomNav />
    </View>
  );
}