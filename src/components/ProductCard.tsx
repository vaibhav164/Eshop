import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {wp, hp, rs, ms, vrs} from '../utils/responsive';
import Video from 'react-native-video';

export default function ProductCard({item, onPress}) {
  const [loading, setLoading] = useState(true);

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
      <View style={styles.imageWrap}>
        {loading && (
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item
              width={wp(40)}
              height={hp(18)}
              borderRadius={rs(10)}
            />
          </SkeletonPlaceholder>
        )}

        {item.video && true ? (
          <Video
            source={{uri: item.video}}
            style={styles.image}
            resizeMode="cover"
            repeat
            muted
            paused={false}
            onLoad={() => setLoading(false)}
            onLoadStart={() => setLoading(true)}
          />
        ) : (
          <Image
            source={{uri: item.images[0]}}
            style={styles.image}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            resizeMode="cover"
          />
        )}
      </View>

      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.name}>
          {item.name}
        </Text>
        <Text style={styles.price}>₹{item.price}</Text>

        <View style={styles.tags}>
          {item.tags.map((t, i) => (
            <Text key={i} style={styles.tag}>
              {t}
            </Text>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: wp(40),
    marginRight: rs(12),
  },

  imageWrap: {
    width: wp(40),
    height: hp(18),
    borderRadius: rs(10),
    overflow: 'hidden',
    backgroundColor: '#f2f2f2',
    position: 'relative',
  },

  image: {
    width: wp(40),
    height: hp(20),
    borderRadius: rs(10),
  },

  info: {
    paddingTop: vrs(8),
  },

  name: {
    fontWeight: '600',
    fontSize: ms(14),
  },

  price: {
    marginTop: vrs(4),
    fontWeight: '700',
    fontSize: ms(14),
  },

  tags: {
    marginTop: vrs(6),
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  tag: {
    backgroundColor: '#eef',
    paddingHorizontal: rs(6),
    paddingVertical: vrs(2),
    borderRadius: rs(6),
    marginRight: rs(6),
    marginTop: rs(4),
    fontSize: ms(11),
  },
});
