// import React from 'react';
import classnames from 'classnames/bind';
import s from '../components/styles/App.styl';
import Page from '../components/Page';
import data from '../collections.json';
import {
  CollectionDescription,
  Collection
} from '../components/Collection.js';


// Data
const collections = data.collections;
const cx = classnames.bind(s);



export const collectionPages = {};

data.keys.map((name, i) => {
  
  let props = collections[name];
  
  collectionPages[name] = (parameterProps) => {
    return (
      <Page>
        <div className={cx('site-title')}>
          <h1>The {props.attrs.title} Collection</h1>
        </div>
        <CollectionDescription name={props.attrs.title} noTitle {...props} />
        <h2>Items in Collection:</h2>
        <Collection name={props.attrs.title} noCommerce products={props.products} />
      </Page>
    )
  }
  
});