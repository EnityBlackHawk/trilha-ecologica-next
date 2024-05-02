
import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import "firebase/compat/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeVhhI_ioeP4nUN8Oh47_j3JsBhR3vwLY",
  authDomain: "utfpr-trilha.firebaseapp.com",
  databaseURL: "https://utfpr-trilha-default-rtdb.firebaseio.com",
  projectId: "utfpr-trilha",
  storageBucket: "utfpr-trilha.appspot.com",
  messagingSenderId: "537190803519",
  appId: "1:537190803519:web:3473bae1522d5e8657b08a",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Export the Firestore and Auth modules
export const db = firebase.firestore(app);
export const storage = firebase.storage(app);