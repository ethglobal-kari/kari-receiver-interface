import firebase from "firebase/app";
import "firebase/firestore";
// Import the functions you need from the SDKs you need</em>
// TODO: Add SDKs for Firebase products that you want to use</em>
// https://Firebase.google.com/docs/web/setup#available-libraries</em>
// Your web app's Firebase configuration</em>
// For Firebase JS SDK v7.20.0 and later, measurementId is optional</em>
const firebaseConfig = {
  apiKey: "AIzaSyAb7lNg4zzUj1BK-VZkb4eDV7kW_DP1f-s",
  authDomain: "kari-protocol.firebaseapp.com",
  projectId: "kari-protocol",
  storageBucket: "kari-protocol.appspot.com",
  messagingSenderId: "983422279447",
  appId: "1:983422279447:web:8aaeef2cde70400e25a152",
  measurementId: "G-HXSMSSKM1G",
};

// Initialize Firebase</em>
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
export const db = firebase.firestore();
