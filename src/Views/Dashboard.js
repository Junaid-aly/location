import React from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";



const image = {
  uri: "https://t3.ftcdn.net/jpg/05/54/54/86/360_F_554548673_mDspJw6PUnXKWemMnbv7YZIHRq3XPel2.jpg",
 
};


function Dashboard({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.profileContainer}>
          <Text style={styles.profileText}>Welcome </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Pickup")}>
            <Text style={styles.buttonText}>Pickup </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f242d",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "left",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height:100,
    borderRadius: 10,
    marginRight: 30,
  },
  profileText: {
    color: "#fff",
    fontSize: 18,
  },
  buttonContainer: {
    width: 300,
    borderRadius: 25,
    overflow: "hidden",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 19,
  },
});

export default Dashboard;
