import React from 'react';
import { Link } from 'react-router';
import collections from '../collections.json'

// styling
import classnames from 'classnames/bind';
import s from './styles/ShoppingCart.styl';
const cx = classnames.bind(s);


import {client, ShoppingCartModel} from '../cart.js';

export let cart = new ShoppingCartModel();


// AddToCart buttons are not children of the ShoppingCart component, so we can't
// trickle-down state Also, I considered whether I should use event listening to
// trigger this, but decided if this is a one-off scenario that this solution is
// fine. (it works without consequence, as well.)
let addToCartButtonsNeedingReadyState = [];


//
//
export class AddToCartButton extends React.Component {
  constructor() {
    super();
    
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    
    this.state = {
      cartReady: cart.ready,
      inCart: false
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
  
  addToCart() {

    
    let that = this;
    let product_id = this.props.attrs.product_id;
    
    cart.addItem(product_id).then(() => {
      console.log("AddToCartButton::", product_id + " was added to the cart");
      that.setState({inCart: true});
    });
  }
  
  removeFromCart() {
    console.error("AddToCartButton::removeFromCart Not Implemented.")
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
      ready: false,
      cartItems: [],
      active: false
    };
    
    this.update = this.update.bind(this);
    this.toggle = this.toggle.bind(this);
    this.checkout = this.checkout.bind(this);
    cart.init()
    
    
    cart.events.on("ready", () => {
      console.log("cart ready");
      that.setState({ready: true});    
    })
    
    cart.events.on("change", this.update);
  }
  
  toggle() {
    this.setState({active: !this.state.active});
  }
  
  update() {
    console.log("cart changed -> <ShoppingCart /> updated")
    console.log("line item:", cart.getCartItems()[0]);
    this.setState({cartItems: cart.getCartItems()})
  }
  
  checkout() {
    
  }
  
  render() {
    
    let innerContent = <p> Working... </p>
    let cartItemCount = null;
    let checkoutButton = null;
    let cartItemClasses = {
      "cart-items-wrapper": true, 
      "active": this.state.active,
    }
    if (this.state.ready) {
        cartItemCount = this.state.cartItems.length;
        if (cartItemCount > 0) {
          innerContent = <ListOfCartItems cartItems={this.state.cartItems} />
        }
        else {
          innerContent = <p className={cx("muted")}>Your cart is empty</p>;
        }
    }
    
    return (
      <div className={cx("shopping-cart-wrapper")}>
        <div className={cx("shopping-cart-icon")}>
          <i className="material-icons" onClick={this.toggle}>shopping_cart</i>
        </div>
        <div className={cx("shopping-cart-item-count")}>
          items: {cartItemCount}
        </div>
        <div className={cx(cartItemClasses)}>
          <h3>Your Cart </h3>
          {innerContent}
          {checkoutButton}
        </div>
      </div>
    )
  }
}

export const ListOfCartItems = (props) => {
  
  return (
    <table className={cx("cart-items")}>
      <tbody>
        {props.cartItems.map((lineItem, i) => {
          return (
            <CartItem key={i} {...lineItem} index={i} />
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
    
  }
  
  changeQuantity(e) {
    let val = e.target.value;
    
  }
  
  render() {
    console.log(this.props)
    let src =  this.props.attrs.image.src ? this.props.attrs.image.src : client.NO_IMAGE_URI;
    return (
      <tr className={cx("cart-item")}>
        <td className={cx("cart-item-image")}>
          <img src={src} alt={`cart item: ${this.props.attrs.title}`}/>
        </td>
        <td className={cx("cart-item-name")}> {this.props.attrs.title} </td>
        <td className={cx("cart-item-id")}>
          pid: {this.props.attrs.product_id}
        </td>
        <td className={cx("cart-item-quantity")}>
          <input type="number"
          value={this.props.attrs.quantity}
          onChange={this.changeQuantity} />
        </td>
        <td className={cx("cart-item-remove")}>
          <span className="hidden">&times;</span>
          <span className="visually-hidden">Remove</span>
        </td>
      </tr>
    )
  }
  
}