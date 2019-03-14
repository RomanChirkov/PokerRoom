import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";

const instructions = Platform.select({
  ios: "Фу, лох, закрой приложение",
  android: "Встряхни телефон, чтобы открыть меню разработчика."
});

export default class StartComponent extends Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Text style={styles.welcome}>Welcome to React Native!</Text>
          <Text style={styles.instructions}>{instructions}</Text>
          <Text style={styles.instructions}>
            Перед тем, как что-то менять, перейди в новую ветку!
          </Text>
          <TextInput
            style={{ height: 40 }}
            placeholder="Напиши сюда поеботу свою"
            onChangeText={text => console.log(text)}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    padding: 10
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
