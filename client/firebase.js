import firebase from 'firebase/app';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyDts4s_P7FFNejDRQkfTxh5GQTTdc4M6O4",
  authDomain: "value-link.firebaseapp.com",
  databaseURL: "https://value-link.firebaseio.com",
  storageBucket: "value-link.appspot.com"
};


export const fireApp = firebase.initializeApp(config);

export default fireApp;


