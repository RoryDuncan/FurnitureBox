import React from 'react';
import { Link } from 'react-router';
import collections from '../collections.json'
import formatMessage from 'format-message';

// styling
import classnames from 'classnames/bind';
import s from './styles/ShoppingCart.styl';
const cx = classnames.bind(s);
import './images/ring-alt.gif';

// i18n
let addToCartText = formatMessage({
  id: "cart:add_to_cart_text",
  default: "Add to Cart",
  description: "The button text for adding an item to the cart."
})

let removeFromCartText = formatMessage({
  id: "cart:remove_from_cart_text",
  default: "Remove from Cart",
  description: "The button text for removing an item from the cart."
})

let removeFromCartTextVariant = formatMessage({
  id: "cart:remove_from_cart_text_variant",
  default: "Remove",
  description: "The button text for removing an item from the cart."
})

let checkoutButtonText = formatMessage({
  id: "cart:checkout_text",
  default: "Checkout",
  description: "The button text for checking out the cart items, proceeding to payment."
})

let orText = formatMessage({
  id: "concept:or",
  default: "or",
  description: "The word 'or' when used in a choice. i.e., 'apples or oranges'"
})

let cartAsyncButtonText = formatMessage({
  id: "cart:async_btn_text",
  default: "Working...",
  description: "The text displayed while a cart item is being added to the cart, while waiting for a server response."
})

let subtotalLabel = formatMessage({
  id: "cart:subtotal_label",
  default: "Subtotal:",
  description: "The text before the amount of currency that the sum of the items in the cart amount to."
})

let currencySymbol = formatMessage({
  id: "concept:currencySymbol",
  default: "$",
  description: "The currency symbol used."
})

let cartEmptyText = formatMessage({
  id: "cart:cart_empty",
  default: "Your cart is empty",
  description: "The text to display when there are no items inside of the cart."
})

let shoppingCartText = formatMessage({
  id: "cart:cart_title",
  default: "Your Cart",
  description: "The text displayed at the top of the cart indicating that it is the user's shopping cart."
})



import {client, ShoppingCartModel} from '../cart.js';

export let cart = new ShoppingCartModel();
cart.init();

//
//
export class AddToCartButton extends React.Component {
  constructor() {
    super();
    
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.update = this.update.bind(this);
    this.checkout = this.checkout.bind(this);
    
    this.state = {
      cartReady: cart.ready,
      inCart: false,
      lineId: null,
      loading: false
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
  
  checkout() {
    cart.checkout();
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
    this.setState({loading: true});
    cart.addItem(product_id).then(() => {
      
      let lineId = cart.getCartItems().filter((el, i) => {
        if (el.attrs.product_id === product_id) return true;
      })
      
      lineId = lineId[0].id;
      
      // begin watching for changes in the cart
      cart.events.on("change", this.update)
      
      that.setState({
        inCart: true,
        loading: false,
        lineId
      });
    });
  }
  
  removeFromCart() {
    if (this.state.lineId) {
      cart.removeItem(this.state.lineId);
    }
  }
  
  render() {
    
    let text = addToCartText;
    let action = this.addToCart;
    let addToCartButtonClasses = cx({
      "add-to-cart": true,
      "in-cart": this.state.inCart,
      "loading": this.state.loading,
      "visually-hidden": !this.state.cartReady
    });
    
    if (this.state.inCart) {
      text = {removeFromCartText};
      action = this.removeFromCart;
      
      return (
        <div className={cx("add-to-cart-actions")}>
          <button className={addToCartButtonClasses} onClick={action}>
            {text}
          </button>
          <em className={cx("in-between-button")}>&ndash; {orText} &ndash;</em>
          <button className={cx("checkout")} onClick={this.checkout}>
            {checkoutButtonText}
          </button>
        </div>
      )
    }
    
    if (this.state.loading) {
      return (
        <div  className={cx("add-to-cart-actions")}>
          <button 
            className={addToCartButtonClasses}>
            {cartAsyncButtonText}
            <img className={cx("loading-spinner")} src="ring-alt.gif" alt={cartAsyncButtonText} />
          </button>
        </div>
      )  
    }
    
    return (
      <div>
        <button 
          className={addToCartButtonClasses} 
          onClick={action}>{text}</button>
      </div>
    )
  }
}


let cartDetails = {
  
  'pid': formatMessage({
    id: "product:details_pid",
    default: 'PID',
    description: "The table heading 'PID', short for Product ID"
  }),
  
  'quantity': formatMessage({
    id: "cart:quantity",
    default: 'Quantity',
    description: "The heading for the cart's column 'quantity', indicating that the column contains the number of items"
  }),
  
  'item': formatMessage({
    id: "cart:item",
    default: 'Item',
    description: "The heading for the cart's column 'item', indicating the name of the product."
  }),
  
  'price': formatMessage({
    id: "cart:price",
    default: 'Price',
    description: "The heading for the cart's column 'price', indicating the cost of the product."
  })
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
  
  componentWillUnmount() {
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
    cart.checkout();
  }
  
  render() {
    
    let innerContent = <p> {cartAsyncButtonText} </p>
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
          checkoutButton = <button onClick={this.checkout} className={cx("checkout-button")}>{checkoutButtonText}</button>
          
          subtotal = <div className={cx("subtotal")}><strong>{subtotalLabel}</strong> {currencySymbol}{cart.cart.subtotal}</div>;
        }
        else {
          innerContent = <p className={cx("muted")}>{cartEmptyText}</p>;
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
          <h3><i className="material-icons">shopping_cart</i>
            {shoppingCartText}
          </h3>
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
          <td>{cartDetails.item}</td>
          <td>{cartDetails.pid}</td>
          <td>{cartDetails.quantity}</td>
          <td>{cartDetails.price}</td>
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
        <td className={cx("cart-item-price")}>{currencySymbol}{this.props.attrs.price}</td>
        <td className={cx("cart-item-remove")}>
          <button onClick={this.removeItem}>{removeFromCartTextVariant}</button>
        </td>
      </tr>
    )
  }
  
}