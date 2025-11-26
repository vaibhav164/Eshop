import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

const banners = [
  { id: 'b1', title: 'Festive Sale', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1200&q=80' },
  { id: 'b2', title: 'New Arrivals', image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=1200&q=80' }
];

export default function BannerCarousel() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {banners.map(b => (
        <View key={b.id} style={styles.card}>
          <Image source={{ uri: b.image }} style={styles.image} />
          <View style={styles.overlay}>
            <Text style={styles.title}>{b.title}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { height: 160, paddingVertical: 8 },
  card: { width: width * 0.9, marginHorizontal: 10, borderRadius: 8, overflow: 'hidden' },
  image: { width: '100%', height: '100%' },
  overlay: { position: 'absolute', left: 12, bottom: 12 },
  title: { color: 'white', fontSize: 20, fontWeight: '700' }
});
