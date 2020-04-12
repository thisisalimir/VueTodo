import firebase from "firebase";
import 'firebase/firestore';
//Firebase Api Settings
const firebaseConfig = {
    apiKey: "AIzaSyCJw3f6OF0Mi6etU2V8fKK1CN4hMC3Yz0U",
    authDomain: "todos-2a996.firebaseapp.com",
    databaseURL: "https://todos-2a996.firebaseio.com",
    projectId: "todos-2a996",
    storageBucket: "todos-2a996.appspot.com",
    messagingSenderId: "500699223808",
    appId: "1:500699223808:web:ecf140cc8aa246796005e5",
    measurementId: "G-MXDNDNM1WW"
};
//Initialize App
const firebaseApp = firebase.initializeApp(firebaseConfig);
//Get New Instance from Firebase App
const firestore = firebaseApp.firestore();

export default firestore;