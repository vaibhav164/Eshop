import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  Platform,
} from 'react-native';
import {fetchProducts} from '../api/products';
import {hp, wp} from '../utils/responsive';
import AntDesign from '@react-native-vector-icons/ant-design';
import EvilIcons from '@react-native-vector-icons/evil-icons';

export default function SearchScreen({navigation}) {
  const [all, setAll] = useState([]);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchProducts().then(res => {
      setAll(res);
      setResults(res);
    });
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults(all);
      return;
    }
    const lower = debouncedQuery.toLowerCase();
    setResults(
      all.filter(
        p =>
          p.name.toLowerCase().includes(lower) ||
          (p.description || '').toLowerCase().includes(lower),
      ),
    );
  }, [debouncedQuery, all]);

  const open = item => navigation.navigate('ProductDetails', {id: item.id});

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
        <AntDesign name={'arrow-left'} size={20} />
      </Pressable>
      <View style={styles.input}>
        <TextInput
          placeholder="Search products..."
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
        />
        <EvilIcons name={'search'} size={20} />
      </View>
      <FlatList
        data={results}
        keyExtractor={i => i.id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => open(item)} style={styles.itemRow}>
            <Image source={{uri: item.images[0]}} style={styles.itemImage} />
            <View>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text>₹{item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 5,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 12,
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  searchInput: {
    width: wp(80),
  },
  backBtn: {
    zIndex: 1000,
    borderRadius: 100,
    paddingHorizontal: '4%',
    margin: '2%',
    marginTop: Platform.OS === 'ios' ? hp(8) : hp(2),
  },
  itemRow: {
    padding: 12,
    borderBottomWidth: 0.5,
    borderColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    height: hp(4),
    width: hp(4),
    marginRight: hp(1),
  },
  itemName: {
    fontWeight: '700',
  },
});
