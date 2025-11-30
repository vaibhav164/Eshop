import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Image} from 'react-native';
import {hp} from '../utils/responsive';

export default function CategoryCard({title, onPress, item}) {

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.inner}>
        <Image
          source={{uri: item?.images[0]}}
          style={{height: hp(4), width: hp(4), marginRight: 10}}
        />
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    backgroundColor: '#feee00',
    borderRadius: 10,
  },
  inner: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
  },
});
