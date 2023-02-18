import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdc4fvWn9Pq6oGHEaARgmnQQFo56Ph2UI",
  authDomain: "todotest-1bd4d.firebaseapp.com",
  projectId: "todotest-1bd4d",
  storageBucket: "todotest-1bd4d.appspot.com",
  messagingSenderId: "523448749187",
  appId: "1:523448749187:web:785424f3bc756e78c01fb6",
  measurementId: "G-T9W4YG2TGN",
};

if (firebase.app.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
