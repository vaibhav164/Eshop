import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
// import BannerCarousel from '../components/BannerCarousel';
// import ProductCard from '../components/ProductCard';
// import { fetchProducts } from '../api/products';
// import CartButton from '../components/CartButton';
import BannerCarousel from '../components/BannerCarousel';
import CartButton from '../components/CartButton';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../api/products';

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchProducts().then(p => {
      setProducts(p);
      setLoading(false);
    });
  }, []);

  const openProduct = (item) => navigation.navigate('ProductDetails', { id: item.id });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <BannerCarousel />
        <View style={styles.header}>
          <Text style={styles.title}>Featured</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Text style={styles.link}>Search</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingLeft: 12 }}>
          {products.map(p => (
            <ProductCard key={p.id} item={p} onPress={openProduct} />
          ))}
        </ScrollView>

        <View style={{ marginTop: 20, paddingHorizontal: 12 }}>
          <Text style={{ fontSize: 18, fontWeight: '700' }}>More for you</Text>
          <View style={{ marginTop: 12 }}>
            {products.map(p => (
              <ProductCard key={`list-${p.id}`} item={p} onPress={openProduct} />
            ))}
          </View>
        </View>
      </ScrollView>

      <CartButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { marginTop: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12 },
  title: { fontSize: 20, fontWeight: '800' },
  link: { color: '#0a7', fontWeight: '600' }
});
