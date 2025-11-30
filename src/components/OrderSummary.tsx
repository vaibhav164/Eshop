import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function OrderSummary({
  subtotal,
  tax,
  giftCharge,
  total,
  onCheckout,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Summary</Text>
      <View style={styles.row}>
        <Text>Subtotal</Text>
        <Text>₹{subtotal}</Text>
      </View>
      <View style={styles.row}>
        <Text>Tax (18%)</Text>
        <Text>₹{tax}</Text>
      </View>
      {giftCharge > 0 && (
        <View style={styles.row}>
          <Text>Gift Box</Text>
          <Text>₹{giftCharge}</Text>
        </View>
      )}
      <View style={styles.row}>
        <Text style={styles.total}>Total</Text>
        <Text style={styles.total}>₹{total}</Text>
      </View>
      <TouchableOpacity style={styles.btn} onPress={onCheckout}>
        <Text style={styles.btnText}>Add Address</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {padding: 16, borderTopWidth: 0.5, borderColor: '#ddd'},
  title: {fontWeight: '700', fontSize: 16, marginBottom: 8},
  row: {flexDirection: 'row', justifyContent: 'space-between', marginTop: 8},
  total: {fontWeight: '700'},
  btn: {
    marginTop: 16,
    backgroundColor: '#111',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: {color: 'white', fontWeight: '700'},
});
