import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function ProductCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
      <Image source={{ uri: item.images[0] }} style={styles.image} />
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price}</Text>
        <View style={styles.tags}>
          {item.tags.map((t,i) => <Text key={i} style={styles.tag}>{t}</Text>)}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { width: 160, marginRight: 12 },
  image: { width: 160, height: 120, borderRadius: 8 },
  info: { paddingTop: 8 },
  name: { fontWeight: '600' },
  price: { marginTop: 4, fontWeight: '700' },
  tags: { marginTop: 6, flexDirection: 'row', flexWrap: 'wrap' },
  tag: { backgroundColor: '#eef', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginRight: 6, marginTop: 4, fontSize: 12 }
});
