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
    <SafeAreaView style={{flex: 1}}>
      <View style={{padding: 16}}>
        <Text style={{fontWeight: '800', fontSize: 20}}>Payment method</Text>
        <View
          style={{
            marginTop: 12,
            padding: 12,
            borderWidth: 1,
            borderColor: '#eee',
            borderRadius: 8,
          }}>
          <Text style={{fontWeight: '700'}}>Credit / Debit Card</Text>
          <Text style={{color: '#555', marginTop: 6}}>XXXX - XXXX - 4242</Text>
          <TouchableOpacity style={{marginTop: 8}}>
            <Text style={{color: '#07f'}}>Change</Text>
          </TouchableOpacity>
        </View>

        <Text style={{fontWeight: '800', marginTop: 20}}>Order Summary</Text>
        <FlatList
          data={items}
          keyExtractor={i => i.product.id}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 12,
              }}>
              <Text>
                {item.product.name} x{item.qty}
              </Text>
              <Text>₹{item.product.price * item.qty}</Text>
            </View>
          )}
        />
        <View style={{marginTop: 12}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>Subtotal</Text>
            <Text>₹{subtotal}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 6,
            }}>
            <Text>Tax</Text>
            <Text>₹{tax}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 6,
              borderTopWidth: 0.5,
              paddingTop: 10,
            }}>
            <Text style={{fontWeight: '700'}}>Total</Text>
            <Text style={{fontWeight: '700'}}>₹{total}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.placeBtn} onPress={placeOrder}>
          <Text style={{color: 'white', fontWeight: '700'}}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  placeBtn: {
    marginTop: 18,
    backgroundColor: '#111',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
});
