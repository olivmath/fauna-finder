import React from "react";
import { View, FlatList, TouchableOpacity, Image } from "react-native";
import { Animals } from "./Animals";

export default function HomeScreen({ navigation }) {
  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={Animals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Details", { item })}
            className="m-2"
          >
            <View className="items-center">
              <Image source={item.images[0]} className="rounded-lg w-64 h-64" />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
