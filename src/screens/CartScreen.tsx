import React, {useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Pressable,
  Text,
  StyleSheet,
} from 'react-native';
import {useCartDispatch, cartSelectors, useCart} from '../context/CartContext';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Headers';
import CartItemCard from '../components/CartItemCard';
import CouponBanner from '../components/CouponBanner';
import OrderSummary from '../components/OrderSummary';

export default function CartScreen() {
  const state = useCart();
  const dispatch = useCartDispatch();
  const nav = useNavigation();
  const items = Object.values(state.items);
  const [giftBox, setGiftBox] = useState(false);

  const subtotal = cartSelectors.getSubtotal(state);
  const tax = Math.round(subtotal * 0.18);
  const giftCharge = giftBox ? 30 : 0;
  const total = subtotal + tax + giftCharge;

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="Your Cart" />
      {items.length === 0 ? (
        <View style={styles.empty}>
          <Text>Your cart is empty.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={it => it.product.id}
            renderItem={({item}) => (
              <CartItemCard
                item={item}
                onIncrement={() =>
                  dispatch({type: 'INCREMENT', payload: {id: item.product.id}})
                }
                onDecrement={() =>
                  dispatch({type: 'DECREMENT', payload: {id: item.product.id}})
                }
                onRemove={() =>
                  dispatch({type: 'REMOVE', payload: {id: item.product.id}})
                }
              />
            )}
          />
          <CouponBanner onApply={() => {}} />
          <Pressable
            style={styles.giftBox}
            onPress={() => setGiftBox(!giftBox)}>
            <Text>Add gift box for ₹30</Text>
            <View style={styles.checkbox}>{giftBox && <Text>✓</Text>}</View>
          </Pressable>
          <OrderSummary
            subtotal={subtotal}
            tax={tax}
            giftCharge={giftCharge}
            total={total}
            onCheckout={() => nav.navigate('CartReview')}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  empty: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  giftBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
    marginBottom: 12,
  },
  checkbox: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
