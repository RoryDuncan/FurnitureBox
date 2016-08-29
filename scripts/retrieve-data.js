var Sync = require('sync');
var json = require('jsonfile');
var firebase = require("firebase");
var path = require('path');

// Initialize Firebase
const config = {
  apiKey: "AIzaSyDts4s_P7FFNejDRQkfTxh5GQTTdc4M6O4",
  authDomain: "value-link.firebaseapp.com",
  databaseURL: "https://value-link.firebaseio.com",
  storageBucket: "value-link.appspot.com"
};

var prepend = "Value-Link Data: "
var fireApp = firebase.initializeApp(config);
var db = fireApp.database().ref("/collections");
Sync(function(){

    // Synchronous action:
  console.log(prepend + "Updating '/client/data.json'")
  console.log(prepend + "Retrieving firebase data..");
  db.once("value")
    
    .then((snapshot) => {
      console.log(prepend+"Retrieved.");
      console.log(prepend+"Saving...")
      var data = snapshot.val();
      json.writeFileSync(path.join("client/collections.json"), data, {spaces: 2});
      console.log(prepend+"Saved.");
      process.exit(0);
    })
    
    .catch((err) => {
      console.error(prepend, "firebase error:", err);
      process.exit(1);
    });
  

});
