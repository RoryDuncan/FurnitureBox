import React from 'react';
import { Link } from 'react-router';
import collections from '../collections.json'

// styling
import classnames from 'classnames/bind';
import s from './styles/ShoppingCart.styl';
const cx = classnames.bind(s);


import client from '../cart.js';

let cart;


export class ShoppingCart extends React.Component {
  
  constructor() {
    super();
    
    
    // init shopify cart
    client.createCart().then(function (cart_) {
      cart = cart_; // do something with updated cart
    });
    
  }
  
  componentWillMount() {

  }
  
  
  render() {
    
    return (
      <div className={cx("shopping-cart-wrapper")}>
        <div className={cx("shopping-cart-icon")}>
          <i className="material-icons">shopping_cart</i>
        </div>
        <p>Shopping Cart!</p>
      </div>
    )
  }
  
  
}