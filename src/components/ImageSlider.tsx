import React from 'react';
import { Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Pressable, Text } from 'react-native';
import { wp } from '../utils/responsive';
const { width } = Dimensions.get('window');

export default function ImageSlider({ item = [], onPressMedia }) {

    const media = [
    ...(item.video ? [item.video] : []),
    ...item.images
  ];
  return (
 <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
    >
      {media.map((src, index) => {
        const isVideo = src.endsWith(".mp4");

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.9}
            onPress={() => onPressMedia(index)}
          >
            {isVideo ? (
              <Image
                source={{ uri: item.images[0] }}
                style={styles.image}
              />
            ) : (
              <Image
                source={{ uri: src }}
                style={styles.image}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { backgroundColor: 'green' },
  image: { width:wp(100), height: wp(100), resizeMode: "stretch" }
});
