import React from 'react';
import classnames from 'classnames/bind';
import s from '../components/styles/App.styl';
import data from '../collections.json';
import { CollectionDescription, Collection } from '../components/Collection';
import { CollectionItemPage } from './CollectionItem';
import formatMessage from 'format-message';

// Data
const collections = data.collections;
const cx = classnames.bind( s );

// i18n
let pageTitleSuffix = formatMessage({ id: 'concept:collection', default: 'Collection', description: 'The concept of a collection, or group of items.' });

let itemsInCollectionsText = formatMessage({ id: 'collections:collection_items_heading', default: 'Items in Collection:', description: 'A heading before a list of items within a single collection.' });

// export all the rendered things into this
export const collectionPages = {};

export const collectionItemPages = {};

data.keys.map(name => {

  let dataset = collections[name];
  collectionItemPages[name] = {};

  // generate CollectionItem Pages
  if ( dataset.products ) {
    let products = dataset.products;

    products.map(( product ) => {
      let handle = product.attrs.handle;
      collectionItemPages[name][handle ] = ( ) => {
        return <CollectionItemPage {...product}/>;
      };
    });
  }

  collectionPages[name] = ( parameterProps ) => {

    if ( parameterProps.children ) {
      return (
        <div>
          <div className={cx( 'site-title' )}>
            {parameterProps.children}
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className={cx( 'site-title' )}>
          <h1>{`${ dataset.attrs.title } ${ pageTitleSuffix }`}</h1>
        </div>
        <CollectionDescription name={dataset.attrs.title} noTitle {...dataset}/>
        <h2>{itemsInCollectionsText}</h2>
        <Collection name={dataset.attrs.title} noCommerce products={dataset.products}/>
      </div>
    );
  };

});
