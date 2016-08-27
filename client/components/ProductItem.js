import React from 'react';
import ReactDOM from "react-dom";
import { Link, IndexLink } from 'react-router';

// styling
import classnames from 'classnames/bind';
import s from './styles/ProductItem.styl';
const cx = classnames.bind(s);

class ProductItem extends React.Component {
  
  constructor() {
    super();
    this.addToCart = this.addToCart.bind(this);
    
    // we might want this to be in state, if propogated by firebase
    this.state = {
      inCart: false
    }
  }
  
  addToCart() {
    console.log(this.props.id, "added to cart");
  }
  
  render() {
    
    let addToCartButtonClasses = cx({
      "add-to-cart": true,
      "in-cart": this.state.inCart
    });
    
    return (
      <div className={cx("product")}>
        <img src={this.props.thumb} />
        <div className={cx("details")}>
          <div className={cx("name")}>{this.props.name}</div>
          <div className={cx("collection")}>{this.props.collection}</div>
          <div className={cx("description")}>{this.props.description}</div>
          <div className={cx("price")}>{this.props.price}</div>
          <button 
            className={addToCartButtonClasses}
            onClick={this.addToCart}>Add To Cart</button>
        </div>
      </div>
    )
  }
  
}

// todo
ProductItem.propTypes = {
  id: React.propTypes.String,
  name: React.propTypes.String
}