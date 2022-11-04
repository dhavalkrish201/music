import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC06tYJREafm3mdJuEXQeV338_f7jXbfsg",
  authDomain: "react-firebase-auth-197bc.firebaseapp.com",
  projectId: "react-firebase-auth-197bc",
  storageBucket: "react-firebase-auth-197bc.appspot.com",
  messagingSenderId: "1023064609026",
  appId: "1:1023064609026:web:dcbf242d4a15385f52721b",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
export { auth, googleAuthProvider, facebookAuthProvider };
