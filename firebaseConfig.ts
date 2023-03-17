import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAtvKxGQjFVFGtD1uH_VslpeL08PWg-_Xw",
  authDomain: "todoapp-react-native-c6a85.firebaseapp.com",
  projectId: "todoapp-react-native-c6a85",
  storageBucket: "todoapp-react-native-c6a85.appspot.com",
  messagingSenderId: "696751747584",
  appId: "1:696751747584:web:9d280e8b453e3a3e4bdee5",
};

// const app = initializeApp(firebaseConfig);
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);


