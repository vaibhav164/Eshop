import React, { useState } from 'react';
import { ScrollView, Image, StyleSheet, Dimensions, Pressable } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { hp, rs, wp } from '../utils/responsive';
import { useNavigation } from '@react-navigation/native';
const { width } = Dimensions.get('window');

const banners = [
  { id: 'b1', title: 'Festive Sale', image: 'https://a.nooncdn.com/mpcms/EN0001/assets/375d1f00-051e-4bce-9e2b-47d098d762cd.png' },
  { id: 'b2', title: 'New Arrivals', image: 'https://a.nooncdn.com/mpcms/EN0001/assets/094042eb-818e-4684-9fe3-2ad0991a9c47.png' },
  { id: 'b3', title: 'New Arrivals', image: 'https://a.nooncdn.com/assets/img-1008x1008/enhanced_dubai_trfileers.1763380400.8052988.png' },
  { id: 'b4', title: 'New Arrivals', image: 'https://a.nooncdn.com/mpcms/EN0001/assets/2fe1abc5-3e4a-407b-9000-44bedc595178.png' }
];

export default function BannerCarousel() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {banners.map(b => (
        <BannerItem key={b.id} banner={b} />
      ))}
    </ScrollView>
  );
}

function BannerItem({ banner }) {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation()

  return (
    <Pressable style={styles.card} onPress={()=>{!loading && navigation.navigate("Categories")}}>
      
      {loading && (
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item
              width={wp(95)}
              height={hp(18)}
              borderRadius={rs(10)}
            />
          </SkeletonPlaceholder>
        )}


      <Image
        source={{ uri: banner.image }}
        style={styles.image}
        onLoadStart={() => setLoading(false)}
        onLoadEnd={() => setLoading(false)}
        resizeMode="stretch"
      />

    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { height: 160, paddingVertical: 8 },
  card: {
    width: wp(100),
    height: hp(18),
    paddingHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { width: wp(95),
    height: hp(18), borderRadius:10 },
  placeholder: {
    position: 'absolute',
    width: wp(90),
    height: hp(10),
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1
  },
  overlay: {
    position: 'absolute',
    left: 12,
    bottom: 12
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700'
  }
});
