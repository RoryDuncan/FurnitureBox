import React from 'react';
import classnames from 'classnames/bind';
import s from '../components/styles/App.styl';
import data from '../collections.json';
import {
  CollectionDescription,
  Collection
} from '../components/Collection.js';
import {CollectionItemPage} from './CollectionItem';



// Data
const collections = data.collections;
const cx = classnames.bind(s);


// export all the rendered things into this
export const collectionPages = {};

export const collectionItemPages = {};

data.keys.map((name, i) => {

  let props = collections[name];
  collectionItemPages[name] = {};

  // generate CollectionItem Pages
  if (props.products) {
    let products = props.products;
    
    products.map((product, i) => {
      let handle = product.attrs.handle;
      collectionItemPages[name][handle] = (_props) => {
        return <CollectionItemPage {...product} />;
      }
    });
  }
  
  collectionPages[name] = (parameterProps) => {
    
    
    if (parameterProps.children) {
      return (
        <div>
          <div className={cx('site-title')}>
            {parameterProps.children}
          </div>
        </div>
      )
      
    }
    
    return (
      <div>
        <div className={cx('site-title')}>
          <h1>The {props.attrs.title} Collection</h1>
        </div>
        <CollectionDescription name={props.attrs.title} noTitle {...props} />
        <h2>Items in Collection:</h2>
        <Collection name={props.attrs.title} noCommerce products={props.products} />
      </div>
    )
  }
  
});