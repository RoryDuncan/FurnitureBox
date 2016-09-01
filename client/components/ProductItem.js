import React from 'react';
import ReactDOM from "react-dom";
import { Link, IndexLink } from 'react-router';

// styling
import classnames from 'classnames/bind';
import s from './styles/ProductItem.styl';
const cx = classnames.bind(s);


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
    console.log(this.props.id, "added to cart");
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
          {this.props.attrs.images.length > 0 ? <ProductImage {...this.props} /> : false}
        </div>
        <div className={cx("details")}>
          <div className={cx("name")}>{this.props.attrs.title}</div>
          <div className={cx("collection")}>{this.props.collection}</div>
          <div className={cx("description")} dangerouslySetInnerHTML={description} />
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
/*ProductItem.propTypes = {
  id: React.propTypes.String,
  name: React.propTypes.String
}*/