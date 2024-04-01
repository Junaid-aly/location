import { initializeApp } from "firebase/app";
import {getFirestore, collection,addDoc} from "firebase/firestore"

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBk4FIV1BiSnMhN1KiE6HeifQugTJS0UPs",
  authDomain: "rides-20981.firebaseapp.com",
  projectId: "rides-20981",
  storageBucket: "rides-20981.appspot.com",
  messagingSenderId: "1032630243338",
  appId: "1:1032630243338:web:eef4ef9f367cb756488ff3"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
async function rideRequestToFirebase(rideRequestToFirebase){
    await addDoc(collection(db, "rides"),rideRequestToFirebase)
}


export async function register(userinfo) {
  try {
    const { email, password, ConfirmPassword, fullname } = userinfo;
    await createUserWithEmailAndPassword(auth, email, password);
    await addDoc(collection(db, "users"), {
      fullname,
      email,
    });
    alert("Successfully Register");
  } catch (e) {
    alert(e.message);
  }
}



export async function login(userinfo) {
  try {
    const { email, password } = userinfo;
    await signInWithEmailAndPassword(auth, email, password);
    return true; // Return true indicating successful login
  } catch (e) {
    alert(e.message);
    return false; // Return false indicating failed login
  }
}

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  rideRequestToFirebase,
  getAuth,
};