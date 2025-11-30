import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function ConfirmationScreen({route}) {
  const nav = useNavigation();
  const {total} = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.checkmark}>✓</Text>
        <Text style={styles.title}>Order Placed Successfully</Text>
        {total && <Text style={styles.total}>Total paid: ₹{total}</Text>}
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            nav.reset({
              index: 0,
              routes: [{name: 'HomeMain', params: {screen: 'Home'}}],
            })
          }>
          <Text style={styles.btnText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 48,
  },
  title: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '700',
  },
  total: {
    marginTop: 8,
  },
  btn: {
    marginTop: 20,
    backgroundColor: '#111',
    padding: 12,
    borderRadius: 8,
  },
  btnText: {
    color: 'white',
    fontWeight: '700',
  },
});
