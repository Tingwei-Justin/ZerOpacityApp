// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkzCT-po26zsEg3M9kKN5t4qUM6W63qxo",
  authDomain: "zeropacity.firebaseapp.com",
  projectId: "zeropacity",
  storageBucket: "zeropacity.appspot.com",
  messagingSenderId: "858054201062",
  appId: "1:858054201062:web:5cf3e7c4b057b9ef70f527",
  measurementId: "G-4DP30644LL",
};

// Initialize Firebase
export default function firebaseClient() {
  initializeApp(firebaseConfig);
}
