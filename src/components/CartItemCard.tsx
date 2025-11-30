import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { hp, wp } from '../utils/responsive';
import EvilIcons from '@react-native-vector-icons/evil-icons';

export default function CartItemCard({ item, onIncrement, onDecrement, onRemove }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.product.images[0] }} style={styles.image} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.product.name}</Text>
        <Text style={styles.price}>₹{item.product.price}</Text>
        <Text style={styles.note}>Only {item.product.stock || 9} Left</Text>
      </View>
      <View style={styles.qtyBox}>
        <TouchableOpacity onPress={onIncrement} style={[styles.qtyBtn, {backgroundColor:'green'}]}><Text style={styles.counter}>+</Text></TouchableOpacity>
        <Text style={styles.qtyText}>{item.qty}</Text>
        <TouchableOpacity onPress={onDecrement} style={[styles.qtyBtn, {backgroundColor:'red'}]}><Text style={styles.counter}>-</Text></TouchableOpacity>
        <TouchableOpacity onPress={onRemove} style={styles.removeBtn}>
            <EvilIcons name={'trash'} size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', padding: 12, borderBottomWidth: 0.5, borderColor: '#eee', alignItems: 'center' },
  image: { height: hp(6), width: hp(6), marginRight: 12, borderRadius: 8 },
  name: { fontWeight: '700', fontSize: 14 },
  price: { fontSize: 13, marginTop: 2 },
  note: { fontSize: 12, color: 'orange', marginTop: 2 },
  qtyBox: { alignItems: 'center', flexDirection:'row', width:wp(30),justifyContent:'space-between' },
  qtyBtn: {paddingHorizontal: 6, borderRadius: 4 },
  qtyText: { marginVertical: 4 },
  counter:{fontWeight:'bold', fontSize:16, color:'#fff'}
});
