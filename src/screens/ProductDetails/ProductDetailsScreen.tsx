import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Pressable,
  Platform
} from 'react-native';
import ImageViewing from "react-native-image-viewing";
import Video from 'react-native-video';
import { useNavigation } from '@react-navigation/native';
import { fetchProductById } from '../../api/products';
import ImageSlider from '../../components/ImageSlider';
import { hp, wp } from '../../utils/responsive';
import {AntDesign} from "@react-native-vector-icons/ant-design"
import EvilIcons from '@react-native-vector-icons/evil-icons';
import { useAppDispatch } from "../../store/hooks";
import { addToCart, removeFromCart } from "../../store/slices/cartSlice";
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
export default function ProductDetailsScreen({ route }) {
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
const dispatch = useAppDispatch();

  const [visibleIndex, setVisibleIndex] = useState(null);
  const [videoVisible, setVideoVisible] = useState(false);
  const [favourate,setFavourate]=useState(false)
  const navigation = useNavigation();

  const media = product
    ? [...product.images, ...(product.video ? [product.video] : [])]
    : [];

  useEffect(() => {
    setLoading(true);
    fetchProductById(id).then(item => {
      setProduct(item);
      setLoading(false);
    });
  }, [id]);

  const handleMediaPress = (index) => {
    const selected = media[index];
    if (selected.endsWith(".mp4")) {
      setVideoVisible(true);
    } else {
      setVisibleIndex(index);
    }
  };

  if (loading || !product)
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  return (
    <SafeAreaView style={{ flex: 1 , backgroundColor:'#fff'}}>
      {/* Back Button */}
      <Pressable
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <MaterialDesignIcons name="arrow-left" size={25} />
      </Pressable>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <Pressable style={styles.wishlistBtn} onPress={()=>setFavourate(!favourate)}>
                {favourate ? (
                  <AntDesign name="heart" size={22} color="red"/>
                ) : (
                  <EvilIcons name="heart" size={27} color="red"/>
                )}
        </Pressable>
        <ImageSlider item={product} onPressMedia={handleMediaPress} />

        <View style={styles.content}>
          <Text style={styles.name}>{product.name}</Text>

          <Text style={styles.price}>₹{product.price}</Text>


          {product.ratings && (
            <Text style={styles.ratings}><AntDesign name="star" color={'#008200'}/> {product.ratings} / 5</Text>
          )}


          <Section title="Description">
            <Text style={styles.desc}>{product.description}</Text>
          </Section>


          {product.highlights?.length > 0 && (
            <Section title="Highlights">
              {product.highlights.map((h, i) => (
                <Text key={i} style={styles.bullet}>• {h}</Text>
              ))}
            </Section>
          )}


          {product.specifications && (
            <Section title="Specifications">
              {Object.entries(product.specifications).map(([key, value], i) => (
                <View key={i} style={styles.specRow}>
                  <Text style={styles.specKey}>{key}</Text>
                  <Text style={styles.specValue}>{value}</Text>
                </View>
              ))}
            </Section>
          )}


          {product.careInstructions && (
            <Section title="Care Instructions">
              <Text style={styles.desc}>{product.careInstructions}</Text>
            </Section>
          )}


          {product.warranty && (
            <Section title="Warranty">
              <Text style={styles.desc}>{product.warranty}</Text>
            </Section>
          )}


          {product.deliveryInfo && (
            <Section title="Delivery Info">
              <Text style={styles.desc}>{product.deliveryInfo}</Text>
            </Section>
          )}


          {product.tags?.length > 0 && (
            <Section title="Tags">
              <View style={styles.tagContainer}>
                {product.tags.map((t, i) => (
                  <Text key={i} style={styles.tag}>{t}</Text>
                ))}
              </View>
            </Section>
          )}


          <View style={{ marginTop: 20 }}>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => dispatch(addToCart({ product, qty: 1 })  )}
            >
              <Text style={styles.addText}>Add to Cart</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.addBtn, styles.removeBtn]}
              onPress={() => dispatch(removeFromCart(product.id)) }
            >
              <Text style={styles.removeText}>Remove from Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.addBtn]}
              onPress={() => navigation.navigate('HomeMain', { screen: 'Cart' })}
            >
              <Text style={styles.addText}>View Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>




      <ImageViewing
        images={product.images.map(i => ({ uri: i }))}
        imageIndex={visibleIndex || 0}
        visible={visibleIndex !== null}
        onRequestClose={() => setVisibleIndex(null)}
      />

      <Modal visible={videoVisible} transparent>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.videoWrapper}
          onPress={() => setVideoVisible(false)}
        >
          <Video
            source={{ uri: product.video }}
            style={styles.fullVideo}
            resizeMode="contain"
            controls
          />
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}


const Section = ({ title, children }) => (
  <View style={{ marginTop: 20 }}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={{ marginTop: 6 }}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" , backgroundColor:'#fff'},

  backBtn: {
    backgroundColor:'#fff',
    zIndex: 1000,
    padding: wp(3),
    margin: "2%",
    justifyContent:'center',
    marginTop:Platform.OS==="ios"?hp(8):hp(1)
  },
  backText: { fontSize: 16, color: "#000", fontWeight: "bold" },

  content: { padding: 16 },

  name: { fontSize: 24, fontWeight: "800" },
  price: { marginTop: 8, fontSize: 20, fontWeight: "700" },
  ratings: { marginTop: 8, fontSize: 16, fontWeight: "600", color: "#444" },

  sectionTitle: { fontSize: 18, fontWeight: "700", marginTop: 8 },
  desc: { fontSize: 14, lineHeight: 20, color: "#444" },

  bullet: { fontSize: 14, marginTop: 4, color: "#333" },

  specRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 0.4,
    borderColor: "#ccc"
  },
  specKey: { fontWeight: "700", textTransform: "capitalize" },
  specValue: { maxWidth: "60%", color: "#333" },

  tagContainer: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "#e8f0ff",
    borderRadius: 6,
    marginTop: 6,
    fontSize: 12,
    fontWeight: "600"
  },

  addBtn: {
    backgroundColor: "#0b5ff0ff",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16
  },
  addText: { color: "white", fontWeight: "700" },
  removeBtn: { backgroundColor: "#d7d7d7ff" },
  removeText: { color: "#000", fontWeight: "700" },

  videoWrapper: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center"
  },
  fullVideo: { width: wp(100), height: hp(80) },
    wishlistBtn: {
    zIndex: 100,
    padding: 8,
    backgroundColor: '#fff8',
    position: 'absolute',
    alignSelf: 'flex-end',
    margin: wp(3),
    borderRadius: 20,
  },
});