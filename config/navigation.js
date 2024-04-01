// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {createDrawerNavigator} from "@react-navigation/drawer"


import Dashboard from "../src/Views/Dashboard";
import Pickup from "../src/Views/Pickup";
import Destination from "../src/Views/Destination";
import CarSelection from "../src/Views/CarSelection";
import RideHistory from "../src/Views/RideHistory"
import SignUp from "../src/Views/SignUp";
import Login from "../src/Views/Login";
// import Driver from "../src/Views/Driver";



const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



function Navigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="SignUp/Login" component={SignUpNavigtor} />
        <Drawer.Screen name="Home_Page" component={DashboardNavigtor} />
        <Drawer.Screen name="Ride History" component={HistoryNavigtor} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function SignUpNavigtor(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Users" component={SignUp} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}



function DashboardNavigtor() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Deshboard" component={Dashboard} />
      <Stack.Screen name="Pickup" component={Pickup} />
      <Stack.Screen name="Destination" component={Destination} />
      <Stack.Screen name="CarSelection" component={CarSelection} />
    </Stack.Navigator>
  );
}

function HistoryNavigtor(){
    return (
      <Stack.Navigator>
        <Stack.Screen name="Ride History" component={RideHistory} />
      </Stack.Navigator>
    );

}
// function DriversNavigtor() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Driver" component={Driver} />
//     </Stack.Navigator>
//   );
// }


export default Navigator;
