import firebase from "firebase/app";
import "firebase/auth"; // for authentication
import "firebase/firestore"; // for cloud firestore

const firebaseConfig = {
  apiKey: "AIzaSyAg1Ru2Z9t_YGotgrYksHE2K3Oy04dLBqk",
  authDomain: "notes-56c5c.firebaseapp.com",
  projectId: "notes-56c5c",
  storageBucket: "notes-56c5c.appspot.com",
  messagingSenderId: "736533287725",
  appId: "1:736533287725:web:0cac0d65cbb7277a8db9a4",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
