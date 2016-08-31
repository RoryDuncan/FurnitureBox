

export const ShoppingCart = () => {
  
  if (typeof this !== ShoppingCart) return new ShoppingCart();
  
  this.items = [];
  
  return this;
};

//
//
ShoppingCart.prototype.addItem = (id) => {
  
};

//
//
ShoppingCart.prototype.removeItem = (id) => {};

//
//
ShoppingCart.prototype.getCartItems = () => {};

//
//
ShoppingCart.prototype.clear = () => {};

//
//
ShoppingCart.prototype.changeQuantity = (id, val) => {};

//
//
ShoppingCart.prototype.checkout = () => {};
