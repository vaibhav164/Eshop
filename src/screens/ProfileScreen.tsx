import React from "react";
import { View, Text, TouchableOpacity } from "react-native";


export default function ProfileScreen() {


  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "700" }}>Welcome</Text>
      <Text style={{ marginTop: 10 }}>{"user?.email"}</Text>

      <TouchableOpacity
        style={{ marginTop: 20, padding: 10, backgroundColor: "#111", borderRadius: 8 }}
        onPress={()=>{}}
      >
        <Text style={{ color: "white" }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
