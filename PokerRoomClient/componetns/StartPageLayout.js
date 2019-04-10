import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";

export default class StartPageLayout extends Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ImageBackground
          style={styles.imageBackground}
          source={require("../img/main-bg-picture.jpg")}
        >
          <View style={styles.container}>
            <Text
              style={[
                styles.h1,
                {
                  marginBottom: "40%"
                }
              ]}
            >
              ПокерКомната
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderBottomColor: "#000",
                  borderBottomWidth: 2
                }
              ]}
              placeholder="Псевдоним или почта"
            />
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder="Пароль"
            />
            <TouchableOpacity style={[styles.button, { marginTop: "50%" }]}>
              <View>
                <Text
                  style={{ textAlignVertical: "center", textAlign: "center" }}
                >
                  Зарегестрироваться
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  imageBackground: {
    width: "100%",
    height: "100%",
    alignItems: "center"
  },
  container: {
    paddingTop: 40,
    paddingBottom: 40,
    width: "100%",
    height: "100%",
    alignItems: "center",
    alignContent: "center"
  },
  h1: {
    color: "#CA9E48",
    fontSize: 45,
    // fontWeight: "bold",
    fontFamily: "Montserrat"
  },
  input: {
    width: "70%",
    height: 52.5,
    backgroundColor: "#fff",
    padding: 10,
    fontFamily: "Montserrat",
    fontSize: 15
  },
  button: {
    width: "70%",
    height: 42,
    backgroundColor: "#CA9E48",
    padding: 10,
    borderRadius: 20,
    alignContent: "center",
    fontFamily: "Montserrat",
    fontSize: 15
  }
});
