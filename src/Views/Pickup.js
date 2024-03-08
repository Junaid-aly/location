import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text,Image,Button, TextInput, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const image = {
  uri: "https://cdn.dribbble.com/users/1053052/screenshots/3600670/_____.gif",
};

function Pickup({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [places,setPlaces] = useState ([])
  const [pickup,setPickup]= useState()


    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        Location.watchPositionAsync(
          {
            accuracy: 6,
            distanceInterval: 1,
            timeInterval: 1000,
          },
          (location) => {
            // console.log("location ",location)
            setLocation(location);
          }
        );
      })();
    }, []);

  const key = "fsq3cxmX94ZodYjHVEhdvgosaheUXcj2TcTq6N8uX5Wu7mw=";

  const SearchPlaces = (text)=> {
    setPickup()
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: key,
      },
    };

    const { latitude,longitude } = location.coords

    fetch(
      `https://api.foursquare.com/v3/places/search?query=${text}&ll=${latitude},${longitude}&raduis=3000`,options)
      .then((response) => response.json())
      .then((response) => {
        // console.log('response',response)
        setPlaces(response.results)
      })
      .catch((err) => console.error(err));
  }

  const PlaceSelect =(item)=>{
    setPickup(item)
  }


  //early  return
  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }
  if (!location) {
    return (
      <View style={styles.container}>
        <Image source={image} style={styles.image} />
      </View>
    );
  }
  return (
  <View style={styles.container}>
    
      <TextInput
        placeholder="Search any location"
        onChangeText={SearchPlaces}
        style={styles.input}
      />
      {!pickup && (
        <View>
          {places.map((item ,index) => {
            return (
              <TouchableOpacity key={index} onPress={() => PlaceSelect(item)}>
                <Text>
                  {item.name},{item.location.address}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
      {pickup && (
        <View>
          <Text>Your Selected Pickup Location is </Text>
          <Text>
            {pickup.name}.{pickup.location.address}
          </Text>
        </View>
      )}
      <MapView
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
        style={styles.map}>
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title={"Your location"}
          description={""}
        />
      </MapView>
      <Button disabled={!pickup}title="Destination" onPress={() => navigation.navigate("Destination",{pickup})}/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "70%",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain", // Ensures the image covers the entire space
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
});

export default Pickup;
