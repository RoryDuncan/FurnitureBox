import React from 'react';
import { Link } from 'react-router';
import collections from '../collections.json'

// styling
import classnames from 'classnames/bind';
import s from './styles/ShoppingCart.styl';
const cx = classnames.bind(s);


import {client, ShoppingCartModel} from '../cart.js';

export let cart = new ShoppingCartModel();
cart.init()

//
//
export class AddToCartButton extends React.Component {
  constructor() {
    super();
    
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.update = this.update.bind(this);
    
    this.state = {
      cartReady: cart.ready,
      inCart: false,
      lineId: null
    }
    
    
    
  }
  
  componentDidMount() {
    if (!cart.ready) {
      let that = this;
      cart.events.on("ready", () => {
        that.setState({cartReady: true})
      })
    }
  }
  
  update() {
    if (this.state.inCart) {

      let product_id = this.props.attrs.product_id;
      // if we find this item, it means the product is still in the cart.
      let item = cart.getCartItems().filter((lineItem) => {
        return (lineItem.attrs.product_id === product_id)
      })[0];
      
      if (!item) {
        cart.events.removeListener("change", this.update)
        this.setState({inCart: false, lineId: null})
      }

    }
  }
  
  addToCart() {

    let that = this;
    let product_id = this.props.attrs.product_id;
    
    cart.addItem(product_id).then(() => {
      
      let lineId = cart.getCartItems().filter((el, i) => {
        if (el.attrs.product_id === product_id) return true;
      })
      
      lineId = lineId[0].id;
      
      // begin watching for changes in the cart
      cart.events.on("change", this.update)
      
      that.setState({inCart: true, lineId});
    });
  }
  
  removeFromCart() {
    if (this.state.lineId) {
      cart.removeItem(this.state.lineId);
    }
  }
  
  render() {
    
    let text = "Add to Cart";
    let action = this.addToCart;
    if (this.state.inCart) {
      text = "Remove from Cart";
      action = this.removeFromCart;
    }
    
    let addToCartButtonClasses = cx({
      "add-to-cart": true,
      "in-cart": this.state.inCart,
      "visually-hidden": !this.state.cartReady
    });
    
    return (
      <button className={addToCartButtonClasses} onClick={action}>{text}</button>
    )
  }
}


//
//
export class ShoppingCart extends React.Component {

  constructor() {
    super();
    let that = this;
    this.state = {
      ready: !!cart.ready,
      cartItems: [],
      active: false
    };
    
    this.update = this.update.bind(this);
    this.toggle = this.toggle.bind(this);
    this.checkout = this.checkout.bind(this);
    this.onCartReady = this.onCartReady.bind(this);
    
  }
  
  onCartReady() {
    this.setState({ready: true});
  }
  
  componentDidMount() {
    cart.events.on("ready", this.onCartReady)
    cart.events.on("change", this.update);
  }
  
  componentWillUnMount() {
    cart.events.removeListener("change", this.update);
    cart.events.removeListener("ready", this.onCartReady);
  }
  
  toggle() {
    this.setState({active: !this.state.active});
  }
  
  update() {
    this.setState({cartItems: cart.getCartItems()})
  }
  
  checkout() {
    console.log("Time to Checkout!")
    let checkoutWindow = window.open(cart.getCheckoutUrl());
  }
  
  render() {
    
    let innerContent = <p> Working... </p>
    let cartItemCount = null;
    let checkoutButton = null;
    let subtotal = null;
    let cartWrapperClasses = {
      "shopping-cart-wrapper": true, 
      "active": this.state.active,
    }
    if (this.state.ready) {
        cartItemCount = this.state.cartItems.length;
        if (cartItemCount > 0) {
          
          // list of cart items
          innerContent = <ListOfCartItems cartItems={this.state.cartItems} />
          
          // checkout button
          checkoutButton = <button onClick={this.checkout} className={cx("checkout-button")}>Checkout</button>
          
          subtotal = <div className={cx("subtotal")}><strong>Subtotal:</strong> ${cart.cart.subtotal}</div>;
        }
        else {
          innerContent = <p className={cx("muted")}>Your cart is empty</p>;
        }
    }
    
    return (
      <div className={cx(cartWrapperClasses)}>
        <button className={cx("shopping-cart-icon")} onClick={this.toggle}>
          <span>Cart</span>
          <span>{cartItemCount}</span>
          <i className="material-icons">shopping_cart</i>
        </button>
        <div className={cx("cart-items-wrapper")}>
          <h3>Your Cart </h3>
          {innerContent}
          {checkoutButton}
          {subtotal}
        </div>
      </div>
    )
  }
}


// 
// 
export const ListOfCartItems = (props) => {
  
  return (
    <table className={cx("cart-items")}>
      <thead>
        <tr>
          <td>&mdash;</td>
          <td>Item</td>
          <td>PID</td>
          <td>Quantity</td>
          <td>Price</td>
        </tr>
      </thead>
      <tbody>
        {props.cartItems.map((lineItem, i) => {
          return (
            <CartItem key={i} {...lineItem} lineId={lineItem.id} index={i} />
          )
        })}
      </tbody>
    </table>
    )
  
  
}

export class CartItem extends React.Component {
  
  constructor(){
    super();
    this.changeQuantity = this.changeQuantity.bind(this);
    this.removeItem = this.removeItem.bind(this);
    
  }
  
  removeItem() {
    let lineId = this.props.lineId;
    cart.removeItem(lineId);
  }
  
  changeQuantity(e) {
    let val = e.target.value;
    let lineId = this.props.lineId;
    
    cart.updateQuantity(lineId, val);
  }
  
  render() {
    let src =  this.props.attrs.image.src ? this.props.attrs.image.src : client.NO_IMAGE_URI;
    return (
      <tr className={cx("cart-item")}>
        <td className={cx("cart-item-image")}>
          <img src={src} alt={`cart item: ${this.props.attrs.title}`}/>
        </td>
        <td className={cx("cart-item-name")}> {this.props.attrs.title} </td>
        <td className={cx("cart-item-id")}>
          {this.props.attrs.product_id}
        </td>
        <td className={cx("cart-item-quantity")}>
          <input type="number"
          value={this.props.attrs.quantity}
          onChange={this.changeQuantity} />
        </td>
        <td className={cx("cart-item-price")}>${this.props.attrs.price}</td>
        <td className={cx("cart-item-remove")}>
          <button onClick={this.removeItem}>Remove</button>
        </td>
      </tr>
    )
  }
  
}