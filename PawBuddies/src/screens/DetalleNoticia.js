import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Image, TouchableOpacity } from 'react-native';

export default function DetailScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
        <Image
            source={{ uri: 'https://picsum.photos/600/400' }}
            style={styles.headerImage}/>

            {/* Botón back */}
            <TouchableOpacity style={styles.backBtn}>
                <Text>←</Text>
            </TouchableOpacity>

            {/* Botón like */}
            <TouchableOpacity style={styles.likeBtn}>
                <Text>♥</Text>
            </TouchableOpacity>
        </View>

        {/* Card Principal */}
        <View style={styles.mainCard}>
            <View style={styles.row}>
                <Image
                    source={{ uri: 'https://picsum.photos/100' }}
                    style={styles.avatar}
                />
                <View>
                    <Text style={styles.name}>Nombre Apellido</Text>
                    <Text style={styles.role}>Persona de acogida</Text>
                </View>

                <Text style={styles.text}>
                    Aquí iría el texto largo de descripción...
                </Text>

                <View style={styles.nav}>
                    <Text>🏠 🐾 ❤️ 👤</Text>
                </View>

            </View>
        </View>



      </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
    position: 'relative',
    },

    headerImage: {
    width: '100%',
    height: 250,
    },

    backBtn: {
    position: 'absolute',
    top: 40,
    left: 20,
    },

    likeBtn: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#2FA39C',
    padding: 10,
    borderRadius: 50,
    },

    mainCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 16,
    },

    row: {
    flexDirection: 'row',
    alignItems: 'center',
    },

    avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    },

    name: {
    fontWeight: '600',
    },

    role: {
    color: 'gray',
    },

    text: {
    marginTop: 10,
    lineHeight: 20,
    },

    nav: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    },

});