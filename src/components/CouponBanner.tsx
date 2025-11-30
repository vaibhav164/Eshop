import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function CouponBanner({onApply}) {
  return (
    <>
      <View style={styles.banner}>
        <Text style={styles.text}>
          Extra 20% off on first order over ₹149. Use code:{' '}
          <Text style={styles.code}>EXTRA20%</Text>
        </Text>
        <Text style={styles.text}>Plus, Shipping is on us!</Text>
      </View>
      <View style={styles.couponRow}>
        <Text style={styles.label}>Apply Coupon</Text>
        <Text style={styles.code}>EXTRA20%</Text>
        <TouchableOpacity style={styles.applyBtn} onPress={onApply}>
          <Text style={styles.applyText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#FFF8DC',
    padding: 12,
    margin: 12,
    borderRadius: 8,
  },
  text: {fontSize: 13},
  code: {fontWeight: '700', color: '#FFD009'},
  couponRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
    marginBottom: 8,
  },
  label: {fontWeight: '600'},
  applyBtn: {
    backgroundColor: '#FFD009',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  applyText: {fontWeight: '700'},
});
