import React from "react";
import { StyleSheet, Button, View, Text,} from "react-native";

function RideHistory() {
  return (
    <View style={styles.container}>
      <Text style={styles.Text}>Ride History</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  buttonContainer: {
    width: 300,
    titleStyle: 80,
    borderRadius: 100,
    alignSelf: "center",
  },
  Text: {
    textAlign: "center",
    titleStyle: 80,
  },
});

export default RideHistory;
