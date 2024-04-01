import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  CustomButton,
} from "react-native";
import { rideRequestToFirebase } from "../../config/firebase";

function CarSelection({ route }) {
  const [isRequestAccepted, setIsRequestAccepted] = useState(false);
  const { pickup, destination } = route.params;
  const fares = {
    bike: 50,
    rickshaw: 88,
    car: 100,
    bus: 150,
    truck: 200,
    airplane: 1000,
  };

  const images = {
    bike: require("./Images/bike.jpg"),
    rickshaw: require("./Images/Rickshaw.jpg"),
    car: require("./Images/civic.jpeg"),
    truck: require("./Images/truck.jpeg"),
  };

  const calculateFare = async (vehicle) => {
    const { latitude: pickupLat, longitude: pickupLong } = pickup.geocodes.main;
    const { latitude: destinationLat, longitude: destinationLong } =
      destination.geocodes.main;

    const distance = calcCrow(
      pickupLat,
      pickupLong,
      destinationLat,
      destinationLong
    );

    const fare = fares[vehicle] * distance;
    alert("Your ride request is pending...");
    alert("RS." + fare.toFixed(2));

    await rideRequestToFirebase({
      pickup,
      destination,
      carType: vehicle,
      fare,
      timestamp: Date.now(),
    });
  };
  

  function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

  function toRad(Value) {
    return (Value * Math.PI) / 180;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.Text}>Car Selection</Text>
      <View>
        <Text style={styles.Text}>Your Selected Pickup Location is</Text>
        <Text style={styles.Text}>
          {pickup.name}, {pickup.location.address}
        </Text>
      </View>
      <View>
        <Text style={styles.Text}>Your Selected Destination Location is</Text>
        <Text style={styles.Text}>
          {destination.name}, {destination.location.address}
        </Text>
      </View>

      <View style={styles.Button}>
        <TouchableOpacity onPress={() => calculateFare("bike")}>
          <View style={styles.imageContainer}>
            <Image source={images.bike} style={styles.image} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => calculateFare("rickshaw")}>
          <View style={styles.imageContainer}>
            <Image source={images.rickshaw} style={styles.image} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => calculateFare("car")}>
          <View style={styles.imageContainer}>
            <Image source={images.car} style={styles.image} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => calculateFare("truck")}>
          <View style={styles.imageContainer}>
            <Image source={images.truck} style={styles.image} />
          </View>
        </TouchableOpacity>
        {/* Add similar TouchableOpacity components for other vehicle types */}
      </View>
      <Modal
        visible={isRequestAccepted}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsRequestAccepted(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Request Accepted!</Text>
          <CustomButton
            title="Close"
            onPress={() => setIsRequestAccepted(false)}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    textAlign: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginRight: 10,
  },
  image: {
    width: 110,
    height: 110,
    margin: 10,
    borderRadius: 50,
    resizeMode: "cover",
  },
  Button: {
    marginTop: 10,
    // padding:30,
    margin: 20,
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  buttonContainer: {
    width: 300,
    margin: 10,
    borderRadius: 10,
    alignSelf: "center",
    overflow: "hidden",
  },
  Text: {
    textAlign: "center",
    marginTop: 10,
  },
});

export default CarSelection;
