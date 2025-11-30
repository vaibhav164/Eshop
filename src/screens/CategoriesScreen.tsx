import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList} from "react-native";
import { fetchProducts } from "../api/products";
import CategoryCard from "../components/CategoryCard";
import Header from "../components/Headers";
export default function CategoriesScreen({ navigation }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts().then((p) => {
      const cats = [...new Set(p.map((x) => x.tags[0] || "General"))];
      setCategories(p);
    });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
        <Header title={"Categories"}/>
      <FlatList
        data={categories}
        keyExtractor={(i) => i}
        renderItem={({ item }) => (
          <CategoryCard
            title={item?.tags[0]}
            item={item}
            onPress={() => navigation.navigate("Search", { category: item })}
          />
        )}
      />
    </SafeAreaView>
  );
}
