import React from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

import { Animals } from "./Animals";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={Animals}
        keyExtractor={(item) => item.id.toString()} // Usar item.id como chave única
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Details", { item })}
          >
            <View style={styles.item}>
              <Image source={item.image} style={styles.image} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    padding: 10,
    alignItems: "center",
  },
  image: {
    width: 250,
    height: 250,
  },
});
