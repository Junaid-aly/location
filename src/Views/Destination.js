// import React from "react";
// import { useState,useEffect } from "react";
// import {StyleSheet, View, Text, Image, Button, TouchableOpacity,TextInput} from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import * as Location from "expo-location";


// const image = {
//   uri: "https://cdn.dribbble.com/users/1053052/screenshots/3600670/_____.gif",
// };

// function Destination({ navigation, route }) {
//   const { pickup } = route.params 

//   const [location, setLocation] = useState(null);
//   const [places, setPlaces] = useState([]);
//   const [destination, setDestination] = useState();


//     useEffect(() => {
//       (async () => { 
//         Location.watchPositionAsync(
//           {
//             accuracy: 6,
//             distanceInterval: 1,
//             timeInterval: 1000,
//           }, (location) => {
//             // console.log("location ",location)
//             setLocation(location);
//           })
//       })();
//     }, []);

//   const key = "fsq3cxmX94ZodYjHVEhdvgosaheUXcj2TcTq6N8uX5Wu7mw=";

//   const SearchPlaces = (text) => {
//     setDestination()
//     const options = {
//       method: "GET",
//       headers: {
//         accept: "application/json",
//         Authorization: key,
//       },
//     };

//     const { latitude, longitude } = location.coords;

//     fetch(
//       `https://api.foursquare.com/v3/places/search?query=${text}&ll=${latitude},${longitude}&raduis=3000`,
//       options
//     )
//       .then((response) => response.json())
//       .then((response) => {
//         // console.log('response',response)
//         setPlaces(response.results);
//       })
//       .catch((err) => console.error(err));
//   };

//   const PlacesSelect = (item) => {
//     setDestination(item);
//   };



//   if (!location) {
//     return (
//       <View style={styles.container}>
//         {/* <Image source={image} style={styles.image} /> */}
//         <Text>loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <View>
//       <View>
//         <Text>Your Selected Pickup Location is </Text>
//         <Text>
//           {pickup.name}.{pickup.location.address}
//         </Text>
//       </View>
//       <TextInput
//         placeholder="Search any location"
//         onChangeText={SearchPlaces}
//         style={styles.input}
//       />
//       {!destination && (
//         <View>
//           {places.map((item, index) => {
//             return (
//               <TouchableOpacity key={index} onPress={() => PlacesSelect(item)}>
//                 <Text>
//                   {item.name},{item.location.address}
//                 </Text>
//               </TouchableOpacity>
//             );
//           })}
//         </View>
//       )}
//       {destination && (
//         <View>
//           <Text>Your Selected Pickup Location is </Text>
//           <Text>
//             {destination.name}, {destination.location.address}
//           </Text>
//         </View>
//       )}
//       <MapView
//         initialRegion={{
//           latitude: location.coords.latitude,
//           longitude: location.coords.longitude,
//           latitudeDelta: 0.001,
//           longitudeDelta: 0.001,
//         }}
//         style={styles.map}>
//         <Marker
//           coordinate={{
//             latitude: location.coords.latitude,
//             longitude: location.coords.longitude,
//           }}
//           title={"Your location"}
//           description={""}
//         />
//       </MapView>
//       <Button
//         disabled={!destination}
//         title="Select Car"
//         onPress={() =>
//           navigation.navigate("CarSelection", { pickup, destination })
//         }
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },

//   buttonContainer: {
//     width: 300,
//     titleStyle: 80,
//     borderRadius: 100,
//     alignSelf: "center",
//   },
// });

// export default Destination;

import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const image = {
  uri: "https://cdn.dribbble.com/users/1053052/screenshots/3600670/_____.gif",
};

function Destination({ navigation, route }) {
  const { pickup } = route.params;

  const [location, setLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [destination, setDestination] = useState();
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
        Location.watchPositionAsync({
          accuracy:6,
          distanceInterval:1,
          timeInterval:1000,
        },(location) => {
          setLocation(location);
        })
    })();
  }, []);

  console.log(location,"location")

  const key = "fsq3cxmX94ZodYjHVEhdvgosaheUXcj2TcTq6N8uX5Wu7mw=";

  const SearchPlaces = (text) => {
    setDestination();
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: key,
      },
    };

    const { latitude, longitude } = location.coords;

    fetch(
      `https://api.foursquare.com/v3/places/search?query=${text}&ll=${latitude},${longitude}&raduis=3000`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setPlaces(response.results);
      })
      .catch((err) => console.error(err));
  };

  const PlacesSelect = (item) => {
    setDestination(item);
  };

  if (!location) {
    return (
      <View style={styles.container}>
        <Text>loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <Text>Your Selected Pickup Location is </Text>
        <Text>
          {pickup.name}.{pickup.location.address}
        </Text>
      </View>
      <TextInput
        placeholder="Search any location"
        onChangeText={SearchPlaces}
        style={styles.input}
      />
      {!destination && (
        <View>
          {places.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => PlacesSelect(item)}>
                <Text>
                  {item.name}, {item.location.address}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
      {destination && (
        <View>
          <Text>Your Selected Pickup Location is </Text>
          <Text>
            {destination.name}, {destination.location.address}
          </Text>
        </View>
      )}
      <MapView
        ref={mapRef}
        onLayout={() => {
          if (mapRef.current && location) {
            mapRef.current.animateToRegion({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            });
          }
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
      <Button
        disabled={!destination}
        title="Select Car"
        onPress={() =>
          navigation.navigate("CarSelection", { pickup, destination })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  map: {
    flex: 1,
  },
});

export default Destination;

