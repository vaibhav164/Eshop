import React, {useCallback, useEffect, useState} from 'react';
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
import { connectToDatabase, createTables } from '../storage/data';

export default function HomeScreen({navigation}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      ConnectToDB();
    setLoading(true);
    fetchProducts().then(p => {
      setProducts(p);
      setLoading(false);
    });
  
  }, []);

  const ConnectToDB = useCallback(async () => {
  try {
    const db = await connectToDatabase()
    await createTables(db)
  } catch (error) {
    console.error(error)
  }
}, [])
    
  const openProduct = async(item) =>{
    navigation.navigate('ProductDetails', {id: item.id});
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
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
          contentContainerStyle={styles.flatListContent}
        />

        <View style={styles.header}>
          <Text style={styles.title}>Featured</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}>
          {products.map(p => (
            <ProductCard key={p.id} item={p} onPress={openProduct} />
          ))}
        </ScrollView>

        <View style={styles.moreSection}>
          <Text style={styles.moreTitle}>More for you</Text>
          <FlatList
            data={products}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <ProductCard item={item} onPress={openProduct} />
            )}
            contentContainerStyle={styles.flatListContent}
          />
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

const SectionTitle = ({title}) => (
  <View style={styles.header}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  flatListContent: {
    paddingHorizontal: 12,
  },
  header: {
    marginVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
  },
  link: {
    color: '#0a7',
    fontWeight: '600',
  },
  horizontalScroll: {
    paddingLeft: 12,
  },
  moreSection: {
    marginTop: 20,
    paddingHorizontal: 12,
  },
  moreTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
});
