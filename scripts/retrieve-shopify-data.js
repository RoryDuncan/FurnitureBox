/*

    This script retrieves our collections & products from the shopify store.
    It then merges the products into their respective collections, and makes a named hash of them:
    
    data.collections[<collection_name>]
    
    data.collections[<collection_name>].products

*/
var Sync = require('sync');
var json = require('jsonfile');
var ShopifyBuy = require('shopify-buy').default;
var path = require('path');
var config = require("../config/shopify.js");
var client = ShopifyBuy.buildClient(config);




const log = (...args) => {
  args.unshift("Update Script:\t")
  console.log.apply(console, args);
}

// resulting container that is saved to file
const data = {
  collections: {},
  keys: []
};

// functions

const getProducts = () => {
  
  log("Retrieving Products...");
  
  return Promise.all(data.keys.map((handle, i) => {
    let collection = data.collections[handle]
    let collection_id = collection.attrs.collection_id;
    let q = client.fetchQueryProducts({collection_id})
    log("Retrieving products from collection", handle);
    
    // client.fetchQuery('products', { collection_id: 456 }).then(products => {
    
    // save our products
    q.then((products) => {
      log(`collection '${handle}' retrieved.`)
      data.collections[handle].products = products || {};
    }).catch(caughtError)

    return q;
  
  })); // end of promise.all
}


const caughtError = (err) => {
  console.error('Something went wrong!', err);
}

const saveCollections = (collections) => {

  collections.forEach((col, i) => {
    data.keys.push(col.attrs.handle);
    data.collections[col.attrs.handle] = col;
  });
  log("Collections retrieved.");
  return getProducts();

}

// init



// Synchronous action:
Sync(() => {

  log("Updating '/client/collections.json'")
  log("Retrieving Shopify Collections from '" + config.domain + "'.");
  

  log("Getting Collections...");
  let p = client.fetchAll('collections')
  .catch(caughtError)
  .then(saveCollections)
  .then(() => {
    json.writeFileSync(path.join("client/collections.json"), data, {spaces: 2});
    log("Done! Check collections.json for the new data.");
    process.exit(0);
  })
});