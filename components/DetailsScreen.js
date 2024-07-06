import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import * as Speech from "expo-speech";
import { MaterialIcons, Entypo } from "@expo/vector-icons"; // Importando ícones do Material Icons e Entypo

export default function DetailsScreen({ route, navigation }) {
  const { item } = route.params;
  const [soundObject, setSoundObject] = useState(null); // Estado para controlar o objeto de áudio

  // Carregar e configurar o objeto de áudio
  useEffect(() => {
    return () => {
      // Limpar o objeto de áudio ao desmontar o componente
      if (soundObject) {
        soundObject.unloadAsync();
      }
    };
  }, []);

  const speak = () => {
    Speech.speak(item.name);
  };

  const playSound = async () => {
    // Verifica se já há um som em reprodução
    if (soundObject) {
      await soundObject.unloadAsync(); // Descarrega o som atual
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
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.description}>
        Descrição do item: {item.description}
      </Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={handleGoBack}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={speak}>
          <MaterialIcons name="record-voice-over" size={24} color="black" />
          <Text style={styles.buttonText}>Falar Nome</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={playSound}>
          <Entypo name="sound" size={24} color="black" />
          <Text style={styles.buttonText}>Tocar Som</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
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
