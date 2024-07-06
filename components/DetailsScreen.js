import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
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
  }, []);

  const speak = (text) => {
    // Parar qualquer fala em curso antes de iniciar uma nova
    Speech.stop();
    if (soundObject) {
      soundObject.stopAsync();
    }
    Speech.speak(text);
  };

  const playSound = async () => {
    // Verifica se já há um som em reprodução
    if (soundObject) {
      await soundObject.stopAsync(); // Descarrega o som atual
    }

    const newSoundObject = new Audio.Sound();
    try {
      await newSoundObject.loadAsync(item.sound);
      await newSoundObject.playAsync();
      setSoundObject(newSoundObject); // Armazena o novo objeto de áudio no estado
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoBack = () => {
    // Verifica se há um som em reprodução ao voltar
    if (soundObject) {
      soundObject.stopAsync(); // Interrompe o som atual antes de voltar
    }
    // Parar qualquer fala em curso ao voltar
    Speech.stop();
    navigation.goBack();
  };
  
  const renderItem = ({ item }) => {
    return (
      <View style={styles.carouselItem}>
        <Image source={item} style={styles.image} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        data={item.images}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        onSnapToItem={(index) => setActiveSlide(index)}
      />
      <Text style={styles.description}>
        Descrição do item: {item.description}
      </Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={handleGoBack}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => speak(item.description)}
        >
          <MaterialIcons name="description" size={24} color="black" />
          <Text style={styles.buttonText}>Descrição</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => speak(item.name)}
        >
          <MaterialIcons name="record-voice-over" size={24} color="black" />
          <Text style={styles.buttonText}>Falar Nome</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={playSound}
          disabled={!item.sound}
        >
          <Entypo
            name="sound"
            size={24}
            color={!item.sound ? "gray" : "black"}
          />
          <Text
            style={[
              styles.buttonText,
              { color: !item.sound ? "gray" : "black" },
            ]}
          >
            Tocar Som
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  carouselContainer: {
    height: screenHeight * 0.7,
  },
  carouselItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  description: {
    fontSize: 16,
    margin: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    alignItems: "center",
  },
  buttonText: {
    marginTop: 5,
  },
});
