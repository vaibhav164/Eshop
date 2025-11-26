import React from 'react';
import { View, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default function ImageSlider({ images = [] }) {
  return (
    <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.wrap}>
      {images.map((uri, i) => (
        <Image key={i} source={{ uri }} style={styles.image} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { height: width * 0.7 },
  image: { width, height: width * 0.7, resizeMode: 'cover' }
});
