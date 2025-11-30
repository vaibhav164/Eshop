import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';
import BannerCarousel from '../components/BannerCarousel';
import ProductCard from '../components/ProductCard';
import {fetchProducts} from '../api/products';

export default function HomeScreen({navigation}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchProducts().then(p => {
      setProducts(p);
      setLoading(false);
    });
  }, []);

  const openProduct = item =>
    navigation.navigate('ProductDetails', {id: item.id});

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{paddingBottom: 120}}
        showsHorizontalScrollIndicator={false}>
        <BannerCarousel />
        <SectionTitle title="Featured Products" />
        <FlatList
          data={products}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <ProductCard item={item} onPress={openProduct} />
          )}
          contentContainerStyle={{paddingHorizontal: 12}}
        />
        <View style={styles.header}>
          <Text style={styles.title}>Featured</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{paddingLeft: 12}}>
          {products.map(p => (
            <ProductCard key={p.id} item={p} onPress={openProduct} />
          ))}
        </ScrollView>

        <View style={{marginTop: 20, paddingHorizontal: 12}}>
          <Text style={{fontSize: 18, fontWeight: '700'}}>More for you</Text>
          <FlatList
            data={products}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <ProductCard item={item} onPress={openProduct} />
            )}
            contentContainerStyle={{paddingHorizontal: 12}}
          />
        </View>
      </ScrollView>

      {/* <CartButton /> */}
    </SafeAreaView>
  );
}
const SectionTitle = ({title}) => (
  <View style={styles.header}>
    <Text style={styles.title}>{title}</Text>
  </View>
);
const styles = StyleSheet.create({
  header: {
    marginVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  title: {fontSize: 20, fontWeight: '800'},
  link: {color: '#0a7', fontWeight: '600'},
});
