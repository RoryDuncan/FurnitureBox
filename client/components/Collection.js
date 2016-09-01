import React from 'react';
import ReactDOM from "react-dom";
import { Link } from 'react-router';

// styling
import classnames from 'classnames/bind';
import s from './styles/Collection.styl';
const cx = classnames.bind(s);

// sub-components
import {ProductItem} from './ProductItem.js';

// data
import data from '../collections.json';
const collections = data.collections;



export const CollectionTitleLink = (props) => {
  let slug = `/collections/${props.name}`;
  
  return (
    <Link to={slug} >
      <h3 className={cx("title")}>{props.name}</h3>
    </Link>
  )
}


//
// Collection's props are expected to be a collection from collections.json
export const Collection = (props) => {
  
  return (
    <div className={cx("collection")}>
      {props.products.map((product, i) =>{
        let props = product;
        return <ProductItem key={i} {...props} listed />
      })}
    </div>
  )
}

//
// The collections shown on /catalog
export const CatalogCollection = (props) => {

  return (
    <div className={cx("collection-wrapper")}>
      
      <CollectionTitleLink name={props.name} />
      <Collection name={props.name} products={props.products}/>

    </div>
  )
}

export const CollectionList = () => {
  return (
    <div className={cx("list-of-collections")}>
      {RenderedCollectionDetails}
    </div>
  )
};




//
//
export const CollectionDescription = (props) => {

  return (
    <div className={cx("collection")}>
      {props.noTitle === true ? false : <h3 className={cx("collection-title")}>{props.name}</h3> }
      <img className={cx("collection-image")} src="http://placehold.it/850x420" />
      <p className={cx("description")}>{props.description}</p>
      <p>More could probably go here...</p>
      {props.linked === true ? 
        <Link to={`/collections/${props.name}`} >Shop the {props.name} collection</Link> 
        : false
      }
    </div>
  )
};


/* Prerendered collection Components
  
  rendered and stored for react-static
*/


// generate our list of collections
// 
export const RenderedCatalog = data.keys.map((name, i) => {
  let collection = collections[name];
  
  return (
    <CatalogCollection key={i} name={collection.attrs.title} products={collection.products} />
  )
});

//
// 
export const RenderedCollectionDetails = data.keys.map((name, i) => {
  
  let props = {
    name: collections[name].attrs.title,
    description: collections[name].description,
    linked: true
  };
  return (
    <CollectionDescription key={i} {...props} />
  )
});