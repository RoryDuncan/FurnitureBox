import React, { PropTypes } from 'react';
import ShopifyBuy from 'shopify-buy';
import { AddToCartButton } from './ShoppingCart.js';
import formatMessage from 'format-message';

// styling
import classnames from 'classnames/bind';
import s from './styles/ProductItem.styl';
const cx = classnames.bind( s );

// i18n
let productItemPlaceholderText = formatMessage({ id: 'product_item:product_image_placeholder_text', default: 'No image available for this product yet', description: 'The screen reader compatible alternative text for a product that is missing an image.' });

/* stateless components */

export const ProductImagePlaceHolder = () => {
  let src = ShopifyBuy.NO_IMAGE_URI;
  return <img src={src} alt={productItemPlaceholderText} title={productItemPlaceholderText}/>;
};

export const ProductImage = ( props ) => {

  // i18n
  let productItemImageAltText = formatMessage({
    id: 'product_item:product_image_alt_text',
    default: 'Preview of {title}',
    description: 'The screen reader compatible alternative text for a product\'s image',
  }, { title: props.attrs.title });

  let src = props.attrs.images[0].src;

  return <img className={cx( 'product-image' )} src={src} alt={productItemImageAltText} title={props.attrs.title}/>;
};

ProductImage.propTypes = {
  attrs: PropTypes.object,
};

/* Components */

export class ProductItem extends React.Component {
  static propTypes = {
    attrs: PropTypes.object,
    noCommerce: PropTypes.bool,
    listed: PropTypes.bool,
    collection: PropTypes.any,
  }

  static defaultProps = {
    noCommerce: false,
    listed: false,
  }

  constructor( props ) {
    super( props );
  }

  render() {

    let price = <div className={cx( 'price' )}>{this.props.attrs.variants[0].price}</div>;
    let addToCart = <AddToCartButton {...this.props}/>;
    if ( this.props.noCommerce ) {
      price = addToCart = null;
    }

    let productClasses = cx({ 'product': true, 'collection-item': this.props.listed });
    let description = {
      __html: this.props.attrs.body_html,
    };
    return (
      <div className={productClasses}>
        <div className={cx( 'product-image-wrapper' )}>
          {this.props.attrs.images.length > 0
            ? <ProductImage {...this.props}/>
            : <ProductImagePlaceHolder/>}
        </div>
        <div className={cx( 'details' )}>
          <div className={cx( 'name' )}>{this.props.attrs.title}</div>
          <div className={cx( 'collection' )}>{this.props.collection}</div>
          <div className={cx( 'description' )} dangerouslySetInnerHTML={description}/> {price}
          {addToCart}
        </div>
      </div>
    );
  }
}
