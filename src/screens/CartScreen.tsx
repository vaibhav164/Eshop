import React, {useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Pressable,
  Text,
  StyleSheet,
} from 'react-native';
import {cartSelectors} from '../context/CartContext';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Headers';
import CartItemCard from '../components/CartItemCard';
import CouponBanner from '../components/CouponBanner';
import OrderSummary from '../components/OrderSummary';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {addToCart, removeFromCart, updateQty} from '../store/slices/cartSlice';
export default function CartScreen() {
  const dispatch = useAppDispatch();
  const nav = useNavigation();
  const [giftBox, setGiftBox] = useState(false);
  const cartItems = useAppSelector(state => state.cart.items);
  const subtotal = cartSelectors.getSubtotal(cartItems);
  const tax = Math.round(subtotal * 0.18);
  const giftCharge = giftBox ? 30 : 0;
  const total = subtotal + tax + giftCharge;
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="Your Cart" />
      {cartItems.length === 0 ? (
        <View style={styles.empty}>
          <Text>Your cart is empty.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <CartItemCard
                  item={item}
                  onIncrement={() => {
                    dispatch(addToCart({product: item, qty: 1}));
                  }}
                  onDecrement={() => {
                    let newQty = item.qty - 1;
                    if (item.qty == 1) {
                      dispatch(removeFromCart(item.id));
                      return;
                    }
                    dispatch(updateQty({id: item.id, qty: newQty}));
                  }}
                  onRemove={() => {
                    dispatch(removeFromCart(item.id));
                  }}
                />
              );
            }}
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
