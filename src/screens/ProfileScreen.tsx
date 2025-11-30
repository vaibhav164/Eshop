import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome</Text>
      <Text style={styles.email}>{"user?.email"}</Text>

      <TouchableOpacity style={styles.logoutBtn} onPress={() => {}}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcome: {
    fontSize: 20,
    fontWeight: "700",
  },
  email: {
    marginTop: 10,
  },
  logoutBtn: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#111",
    borderRadius: 8,
  },
  logoutText: {
    color: "white",
  },
});
