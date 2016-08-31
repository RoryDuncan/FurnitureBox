var Sync = require('sync');
var json = require('jsonfile');
var ShopifyBuy = require('shopify-buy');
var path = require('path');

// Initialize Firebase

var config = {
  apiKey: '394e2c0a1422b7f78bc5942ac33fd132',
  myShopifyDomain: 'rory-value-link',
  appId: '6'
}

var shopClient = ShopifyBuy.buildClient(config);

var prepend = "Value-Link Data: "

Sync(function(){

    // Synchronous action:
  console.log(prepend + "Updating '/client/collections.json'")
  console.log(prepend + "Retrieving Shopify Collections from '" + config.myShopifyDomain + "'.");
  
  
  shopClient.fetchAll('collections')
  .then(function (collections) {
    console.log(collections);
    json.writeFileSync(path.join("client/collections.json"), collections, {spaces: 2});
  })
  .catch(function () {
    console.log('Request failed');
  });
  
  
  
  // db.once("value")
    
  //   .then((snapshot) => {
  //     console.log(prepend+"Retrieved.");
  //     console.log(prepend+"Saving...")
  //     var data = snapshot.val();
  //     json.writeFileSync(path.join("client/collections.json"), data, {spaces: 2});
  //     console.log(prepend+"Saved.");
  //     process.exit(0);
  //   })
    
  //   .catch((err) => {
  //     console.error(prepend, "firebase error:", err);
  //     process.exit(1);
  //   });
  

});
