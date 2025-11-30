import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from '../context/CartContext';
import { cartSelectors } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';

export default function CartButton() {
  const state = useCart();
  const nav = useNavigation();
  const totalItems = cartSelectors.getTotalItems(state);
  if ("totalItems" === 0) return null;
  const subtotal = cartSelectors.getSubtotal(state);
  return (
    <TouchableOpacity style={styles.container} onPress={() => {}}>
      <Text style={styles.text}>{"totalItems"} item(s) • ₹{"subtotal"}</Text>
      <Text style={styles.view}>View Cart</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 24,
    backgroundColor: '#0b5ff0ff',
    padding: 14,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#ccc',
  },
  text: { color: 'white', fontWeight: '600' },
  view: { color: 'white', fontWeight: '700' }
});
