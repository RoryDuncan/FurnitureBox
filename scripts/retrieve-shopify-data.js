var Sync = require('sync');
var json = require('jsonfile');
var ShopifyBuy = require('shopify-buy').default;
var path = require('path');

// Initialize Firebase

var config = {
  apiKey: '394e2c0a1422b7f78bc5942ac33fd132',
  domain: 'rory-value-link.myshopify.com',
  appId: '6'
}

var shopClient = ShopifyBuy.buildClient(config);

var prepend = "Value-Link Data: "

Sync(function(){

    // Synchronous action:
  console.log(prepend + "Updating '/client/collections.json'")
  console.log(prepend + "Retrieving Shopify Collections from '" + config.domain + "'.");
  
  
  shopClient.fetchAll('collections')
  .then(function (collections) {
    console.log(prepend+"Retrieved.");
    console.log(prepend+"Saving...")
    json.writeFileSync(path.join("client/collections.json"), collections, {spaces: 2});
    console.log(prepend+"Saved.");
    process.exit(0);
  })
  .catch(function (err) {
    console.error('Something went wrong!', err);
  });
});
