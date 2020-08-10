import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCun0jiScEdecO1M0Midn1Yu7t0RGsnyoE",
  authDomain: "instagram-clone-dc4c7.firebaseapp.com",
  databaseURL: "https://instagram-clone-dc4c7.firebaseio.com",
  projectId: "instagram-clone-dc4c7",
  storageBucket: "instagram-clone-dc4c7.appspot.com",
  messagingSenderId: "1088135612664",
  appId: "1:1088135612664:web:3b7f8454f83f1c16a7530d",
  measurementId: "G-PL7JVDWEN2",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebaseApp.auth();
const firestore = firebaseApp.firestore();
const storage = firebaseApp.storage();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();
export { auth, firestore, storage, timestamp };
