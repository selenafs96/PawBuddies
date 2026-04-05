import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function NewsCard({ item, onLike }) {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    if (onLike) {
      onLike();
    }
  };

  // URLs de imágenes de prueba (perros)
  const dogImages = [
    'https://images.unsplash.com/photo-1633722715463-d30628519b3f?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1618826411640-d6df44dd3f7a?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1587300411515-430ee519e0e3?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1612536315140-3c1d0f87f934?w=500&h=300&fit=crop',
  ];

  // Asignar imagen según el ID del item
  const imageUrl = dogImages[item.id % dogImages.length];

  return (
    <View style={styles.card}>
      {/* Frame 149 - Content */}
      <View style={styles.contentWrapper}>
        {/* Frame 119 - Header Row */}
        <View style={styles.headerRow}>
          {/* Frame 147 - Author Info */}
          <View style={styles.authorSection}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
            {/* Frame 115 - Author Text */}
            <View style={styles.authorTextContainer}>
              <Text style={styles.authorName}>{item.autor || 'Nombre Apellido'}</Text>
              <Text style={styles.authorRole}>{item.rol || 'Persona de acogida'}</Text>
            </View>
          </View>
          {/* More button */}
          <TouchableOpacity style={styles.moreButton}>
            <Ionicons name="ellipsis-vertical" size={18} color="#1C1B1F" />
          </TouchableOpacity>
        </View>

        {/* Rectangle 45 - Image WITH REAL IMAGE */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        {/* Frame 148 - Actions Row */}
        <View style={styles.actionsRow}>
          {/* Frame 146 - Action Icons */}
          <View style={styles.actionsGroup}>
            <TouchableOpacity onPress={handleLike}>
              <Ionicons
                name={liked ? 'heart' : 'heart-outline'}
                size={18}
                color={liked ? '#16A99F' : '#2F3D3C'}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionSpacing}>
              <Ionicons name="chatbubble-outline" size={18} color="#2F3D3C" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionSpacing}>
              <Ionicons name="share-social-outline" size={18} color="#1C1B1F" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity>
            <Ionicons name="bookmark-outline" size={18} color="#1C1B1F" />
          </TouchableOpacity>
        </View>

        {/* Description Text */}
        <Text style={styles.description}>
          {item.descripcion ||
            'I found this sweet dog and am looking for a loving home for them. If you\'re ready to welcome a new furry friend into your life, this adorable pup is waiting to bring joy and...'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    // Frame 151 - Card Container
    width: 343,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginVertical: 6,
  },
  contentWrapper: {
    // Frame 149 - Content
    gap: 11,
  },
  headerRow: {
    // Frame 119 - Header Row
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 327,
    height: 37,
  },
  authorSection: {
    // Frame 147 - Author Info
    flexDirection: 'row',
    alignItems: 'center',
    width: 149,
    height: 37,
    gap: 6,
  },
  avatar: {
    // Ellipse 11 - Avatar
    width: 37,
    height: 37,
    borderRadius: 18.5,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
  },
  authorTextContainer: {
    // Frame 115 - Author Text
    width: 106,
    height: 34,
    gap: 4,
  },
  authorName: {
    // Nombre Apellido
    width: 90,
    height: 15,
    fontFamily: 'Tilt Neon',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 15,
    color: '#000000',
  },
  authorRole: {
    // Persona de acogida
    width: 106,
    height: 15,
    fontFamily: 'Tilt Neon',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 15,
    color: '#999999',
  },
  moreButton: {
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    // Rectangle 45 - Image Container
    width: 343,
    height: 173,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#D9D9D9',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  actionsRow: {
    // Frame 148 - Actions Row
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: 327,
    height: 18,
  },
  actionsGroup: {
    // Frame 146 - Action Icons
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: 64,
    height: 18,
    gap: 5,
  },
  actionSpacing: {
    marginLeft: 5,
  },
  description: {
    // Description text
    width: 325,
    height: 42,
    fontFamily: 'Urbanist',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    color: '#000000',
  },
});