
import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import "firebase/compat/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAll1nkkrzwZF5zbiRdjSd5S98Ei25EzLc",
  authDomain: "trilha-ecologia-utfpr.firebaseapp.com",
  projectId: "trilha-ecologia-utfpr",
  storageBucket: "trilha-ecologia-utfpr.appspot.com",
  messagingSenderId: "870164170047",
  appId: "1:870164170047:web:59e9913e85ef4346027f8a",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Export the Firestore and Auth modules
export const db = firebase.firestore(app);
export const storage = firebase.storage(app);