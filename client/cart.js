
// initialize our config for shopify-buy

import config from '../config/shopify.js';
import ShopifyBuy from 'shopify-buy';

export const client = ShopifyBuy.buildClient(config);


const ShoppingCart = () => {
  
  this.cart = null;
  return this;
}


ShoppingCart.prototype.init = () => {
  // init shopify cart
  let p = client.createCart()
  // return a thenable promise
  return p.then(function (cart_) {
    this.cart = cart_;
    return p;
  });
};