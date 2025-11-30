import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {cartSelectors, useCart, useCartDispatch} from '../context/CartContext';
import {useNavigation} from '@react-navigation/native';

export default function CartReviewScreen() {
  const state = useCart();
  const nav = useNavigation();
  const dispatch = useCartDispatch();
  const items = Object.values(state.items);

  const subtotal = cartSelectors.getSubtotal(state);
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  const placeOrder = async () => {
    await new Promise(res => setTimeout(res, 800));
    dispatch({type: 'CLEAR'});
    nav.replace('Confirmation', {total});
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.sectionTitle}>Payment method</Text>
        <View style={styles.paymentBox}>
          <Text style={styles.paymentLabel}>Credit / Debit Card</Text>
          <Text style={styles.cardNumber}>XXXX - XXXX - 4242</Text>
          <TouchableOpacity style={styles.changeBtn}>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Order Summary</Text>
        <FlatList
          data={items}
          keyExtractor={i => i.product.id}
          renderItem={({item}) => (
            <View style={styles.itemRow}>
              <Text>
                {item.product.name} x{item.qty}
              </Text>
              <Text>₹{item.product.price * item.qty}</Text>
            </View>
          )}
        />

        <View style={styles.summaryBox}>
          <View style={styles.summaryRow}>
            <Text>Subtotal</Text>
            <Text>₹{subtotal}</Text>
          </View>
          <View style={styles.summaryRowMargin}>
            <Text>Tax</Text>
            <Text>₹{tax}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalLabel}>₹{total}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.placeBtn} onPress={placeOrder}>
          <Text style={styles.placeBtnText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    padding: 16,
  },
  sectionTitle: {
    fontWeight: '800',
    fontSize: 20,
    marginTop: 20,
  },
  paymentBox: {
    marginTop: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
  },
  paymentLabel: {
    fontWeight: '700',
  },
  cardNumber: {
    color: '#555',
    marginTop: 6,
  },
  changeBtn: {
    marginTop: 8,
  },
  changeText: {
    color: '#07f',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  summaryBox: {
    marginTop: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryRowMargin: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    borderTopWidth: 0.5,
    paddingTop: 10,
  },
  totalLabel: {
    fontWeight: '700',
  },
  placeBtn: {
    marginTop: 18,
    backgroundColor: '#111',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  placeBtnText: {
    color: 'white',
    fontWeight: '700',
  },
});
