

export const ShoppingCart = () => {
  
  if (typeof this !== ShoppingCart) return new ShoppingCart();
  
  this.items = [];
  
  return this;
};


ShoppingCart.prototype.addItem = (id) => {
  
};

ShoppingCart.prototype.removeItem = () => {};

ShoppingCart.prototype.viewCart = () => {};

ShoppingCart.prototype.clear = () => {};

ShoppingCart.prototype.changeQuantity = () => {};

ShoppingCart.prototype.checkout = () => {};
