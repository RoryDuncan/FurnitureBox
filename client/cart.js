
// initialize our config for shopify-buy

import config from '../config/shopify.js';
import ShopifyBuy from 'shopify-buy';
import EventEmitter from 'events';

export const client = ShopifyBuy.buildClient(config);







/* Shopping Cart Interface */


// 
// usage: cart = new ShoppingCart();
// cart.init();
export class ShoppingCartModel {
  
  constructor(){
    this.cart = null;
    this._updateCartRef = this._updateCartRef.bind(this);
    this.init = this.init.bind(this);
    this.ready = false;
    this.events = new EventEmitter();
    // lazy load product information based on when it is added to the cart.
    this.productsById = {};
  }
  
  // 
  // 
  init() {
    // init shopify cart
    let p = client.createCart()
    p.then(this._updateCartRef);
    p.then(() => {
      this.ready = true;
      this.events.emit("ready");
    })
    // return a thenable promise
    return p;
  }
  
  //
  //
  _updateCartRef(cart_) {
    this.cart = cart_;
    this.events.emit("change")
    return cart_;
  }
  
  
  getProduct(product_id) {
    
    let that = this;
    let product = this.productsById[product_id] || null;
    
    var p = new Promise((fulfill, reject) => {
        return fulfill(product);
      });
    
    if (!product) {
      console.log("fetching product", product_id)
      p = client.fetchProduct(product_id)
      .then((product) => {
        that.productsById[product_id] = product;
        return product;
      })
    }
    return p;
  }
  
  //
  //
  addItem(product_id, variantIndex = 0) {
    let that = this;
    return this.getProduct(product_id).then((product) => {
      let variant = product.variants[variantIndex];
      let quantity = 1;
      return that.cart.addVariants({variant, quantity}).then(this._updateCartRef)
    });
  }
  
  //
  //
  removeItem(lineId) {
    let p = this.cart.removeLineItem(lineId);
    p.then(this._updateCartRef)
    return p;
  }
  
  //
  //
  clearItems() {
    let p = this.cart.clearLineItems();
    p.then(this._updateCartRef)
    return p;
  }
  
  //
  //
  updateQuantity(lineId, quantity) {
    
    let p = this.cart.updateLineItem(lineId, quantity)
    p.then(this._updateCartRef);
    return p;
  }
  
  //
  //
  getCartItems() {
    if (this.cart) {
      return this.cart.lineItems;
    } else {
      return [];
    }
  }
  
  //
  //
  getSubtotal() {
    return this.cart.subtotal;
  }
  
  //
  //
  getCheckoutUrl() {
    return this.cart.checkoutUrl;
  }
  
}
