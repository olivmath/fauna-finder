import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { Audio } from "expo-av";
import * as Speech from "expo-speech";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";

const { width: screenWidth } = Dimensions.get("window");

export default function DetailsScreen({ route, navigation }) {
  const { item } = route.params;
  const [soundObject, setSoundObject] = useState(null);

  useEffect(() => {
    return () => {
      if (soundObject) {
        soundObject.unloadAsync();
      }
      Speech.stop();
    };
  }, [soundObject]);

  const speak = (text) => {
    Speech.stop();
    if (soundObject) {
      soundObject.stopAsync();
    }
    Speech.speak(text);
  };

  const playSound = async () => {
    if (soundObject) {
      await soundObject.stopAsync();
    }

    const newSoundObject = new Audio.Sound();
    try {
      await newSoundObject.loadAsync(item.sound);
      await newSoundObject.playAsync();
      setSoundObject(newSoundObject);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoBack = () => {
    if (soundObject) {
      soundObject.stopAsync();
    }
    Speech.stop();
    navigation.goBack();
  };

  const renderItem = ({ item }) => {
    return (
      <View className="items-center">
        <Image source={item} className="w-full h-full rounded-lg" />
      </View>
    );
  };

  return (
    <View className="flex-1 p-5 bg-white">
      <Carousel
        data={item.images}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
      />
      <Text className="text-lg mb-5">
        Descrição do item: {item.description}
      </Text>
      <View className="flex-row justify-around">
        <TouchableOpacity className="items-center" onPress={handleGoBack}>
          <MaterialIcons name="arrow-back" size={24} color="#34D399" />
          <Text className="mt-1 text-primary font-bold">Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center"
          onPress={() => speak(item.description)}
        >
          <MaterialIcons name="description" size={24} color="black" />
          <Text className="mt-1">Descrição</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center"
          onPress={() => speak(item.name)}
        >
          <MaterialIcons name="record-voice-over" size={24} color="black" />
          <Text className="mt-1">Falar Nome</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center"
          onPress={playSound}
          disabled={!item.sound}
        >
          <Entypo
            name={!item.sound ? "sound-mute" : "sound"}
            size={24}
            color={!item.sound ? "grey" : "black"}
          />
          <Text className={!item.sound ? "mt-1 text-gray-400" : "mt-1"}>
            Tocar Som
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
