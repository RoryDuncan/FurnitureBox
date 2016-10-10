import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames/bind';
import formatMessage from 'format-message';
import { ProductItem } from './ProductItem.js';

// styling
import s from './styles/Collection.styl';
const cx = classnames.bind( s );

// sub-components

// data
import data from '../collections.json';
const collections = data.collections;

export const CollectionTitleLink = ( props ) => {
  let slug = `/collections/${ props.name }`;

  return (
    <Link to={slug}>
      <h3 className={cx( 'title' )}>{props.name}</h3>
    </Link>
  );
};

CollectionTitleLink.propTypes = {
  name: PropTypes.string,
};

//
// A collection is a list of products
// Collection's props are expected to be a collection from collections.json
export const Collection = ( props ) => {
  let noCommerce = props.noCommerce || null;
  let listed = props.listed || null;
  return (
    <div className={cx( 'collection' )}>
      {props.products.map(( product, i ) => {
        return <ProductItem
                key={i}
                noCommerce={noCommerce}
                listed={listed}
                {...product}
              />;
      })}
    </div>
  );
};

Collection.propTypes = {
  products: PropTypes.any,
  noCommerce: PropTypes.any,
  listed: PropTypes.any,
};

//
// The collections shown on /shop
export const CatalogCollection = ( props ) => {

  // i18n
  let learnAboutCollectionLinkText = formatMessage({
    id: 'collection:learn_more_link',
    default: 'Learn about the {name} Collection',
    description: 'Link text, linking to a collection page where the user can learn more about the collection.',
  }, { name: props.name });

  return (
    <div className={cx( 'collection-wrapper' )}>
      <h3>{props.name}</h3>
      <p>
        <Link to={`/collections/${ props.name }`}>{learnAboutCollectionLinkText}</Link>
      </p>
      <Collection name={props.name} products={props.products}/>
    </div>
  );
};

CatalogCollection.propTypes = {
  name: PropTypes.any,
  products: PropTypes.any,
};

export const CollectionList = ( ) => {
  return (
    <div className={cx( 'list-of-collections' )}>
      {RenderedCollectionDetails}
    </div>
  );
};

//
// The name, image, and description of a collection. Does not include items
export const CollectionDescription = ( props ) => {

  // i18n
  let shopThisCollectionBtnText = formatMessage({ id: 'collection:shop_this_collection_btn', default: 'Shop this Collection', description: 'Button text, taking the user to the shop where they can buy products of the current collection.' });

  let viewThisCollectionLinkText = formatMessage({
    id: 'collection:view_collection_link',
    default: 'View the {name} Collection',
    description: 'Link text, link the user to the collection\'s page.',
  }, { name: props.attrs.title });

  let src = '//placehold.it/1040x420';
  if ( props.attrs.image !== null ) {
    src = props.attrs.image.src;
  }

  return (
    <div className={cx( 'collection' )}>
      {props.noTitle === true
        ? false
        : <h3 className={cx( 'collection-title' )}>{props.attrs.title}</h3>}
      <img className={cx( 'collection-image' )} src={src}/>
      <div className={cx( 'shop-collection' )}>
        <Link to={`/shop#${ props.attrs.title.toLowerCase( ) }`}>
          <button>{shopThisCollectionBtnText}</button>
        </Link>
      </div>
      <div className={cx( 'description' )} dangerouslySetInnerHTML={props.description}/> {props.linked === true
        ? <Link to={`/collections/${ props.attrs.title.toLowerCase( ) }`}>{viewThisCollectionLinkText}</Link>
        : false
}

    </div>
  );
};

CollectionDescription.propTypes = {
  attrs: PropTypes.any,
  noTitle: PropTypes.any,
  description: PropTypes.any,
  linked: PropTypes.any,
};

/* Prerendered collection Components

  rendered and stored for react-static
*/

// generate our list of collections
//
export const RenderedCatalog = data.keys.map(( name, i ) => {
  let collection = collections[name];
  return <CatalogCollection key={i} name={collection.attrs.title} products={collection.products} noCommerce={false} />;
});

//
//
export const RenderedCollectionDetails = data.keys.map(( name, i ) => {

  let props = collections[name];
  props.description = {
    '__html': collections[name].attrs.body_html,
  };

  return <CollectionDescription key={i} linked {...props} />;
});
