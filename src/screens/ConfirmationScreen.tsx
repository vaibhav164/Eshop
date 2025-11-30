import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ConfirmationScreen({ route }) {
  
  const nav = useNavigation();
  const { total } = route.params || {};
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 48 }}>✓</Text>
        <Text style={{ marginTop: 12, fontSize: 20, fontWeight: '700' }}>Order Placed Successfully</Text>
        {total && <Text style={{ marginTop: 8 }}>Total paid: ₹{total}</Text>}
        <TouchableOpacity style={styles.btn} onPress={() => nav.navigate('Home')}>
          <Text style={{ color: 'white', fontWeight: '700' }}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btn: { marginTop: 20, backgroundColor: '#111', padding: 12, borderRadius: 8 }
});
