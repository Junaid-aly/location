

import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableHighlight,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { login } from "../../config/firebase";


const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const signIn = async () => {
    const success = await login({ email, password });
    if (success) {
      alert("Successfully logged");
      navigation.navigate("Home_Page"); // Navigate to the dashboard screen
    }
  };

  return (
    <ImageBackground
      source={require("./Images/bg-image.jpg")}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="black"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="black"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableHighlight
          style={styles.button}
          underlayColor="#3282b8"
          onPress={signIn}>
          <Text style={styles.buttonText}>Log_in</Text>
        </TouchableHighlight>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 45,
    width: 300,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  button: {
    width: 150,
    backgroundColor: "black",
    borderRadius: 5,
    marginTop: 10,
    paddingVertical: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
});

export default Login;
