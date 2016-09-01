import React from 'react';
import ReactDOM from "react-dom";
import { Link, IndexLink } from 'react-router';
import ShopifyBuy from 'shopify-buy';


// styling
import classnames from 'classnames/bind';
import s from './styles/ProductItem.styl';
const cx = classnames.bind(s);


export const ProductImagePlaceHolder = (props) => {
  let src = ShopifyBuy.NO_IMAGE_URI;
  return (
    <img src={src} alt="No image available yet." title="We don't have an image for this product yet. Sorry!" />
  )
}

export const ProductImage = (props) => {

  let src = props.attrs.images[0].src;

  return (
    <img  className={cx("product-image")} 
          src={src} alt={`${props.attrs.title} Image`}
          title={props.attrs.title} />
  )
}

export class ProductItem extends React.Component {
  
  constructor() {
    super();
    this.addToCart = this.addToCart.bind(this);
    
    // we might want this to be in state, if propogated by firebase
    this.state = {
      inCart: false
    }
  }
  
  addToCart() {
    console.log(this.props.attrs.product_id + " was added to the cart");
  }
  
  render() {
    
    let addToCartButtonClasses = cx({
      "add-to-cart": true,
      "in-cart": this.state.inCart
    });
    
    let productClasses = cx({
      "product": true,
      "collection-item": this.props.listed
    })
    
    let description = {__html: this.props.attrs.body_html};
    return (
      <div className={productClasses}>
        <div className={cx("product-image-wrapper")}>
          {this.props.attrs.images.length > 0 ? <ProductImage {...this.props} /> : <ProductImagePlaceHolder />}
        </div>
        <div className={cx("details")}>
          <div className={cx("name")}>{this.props.attrs.title}</div>
          <div className={cx("collection")}>{this.props.collection}</div>
          <div className={cx("description")} dangerouslySetInnerHTML={description} />
          <div className={cx("price")}>{this.props.attrs.variants[0].price}</div>
          <button 
            className={addToCartButtonClasses}
            onClick={this.addToCart}>Add To Cart</button>
        </div>
      </div>
    )
  }
  
}
