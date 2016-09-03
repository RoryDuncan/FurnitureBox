import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import classnames from 'classnames/bind';
import 'normalize.css';
import './styles/lib/skeleton.css';

// Using CSS Modules so we assign the styles to a variable
import s from './styles/App.styl';
const cx = classnames.bind(s);
// import logo from './react-logo.png';

// Favicon link is in the template, this just makes webpack package it up for us
import './favicon.ico';


// Sub Components
import {AuthRegion} from './Auth.js';
import {SiteHeader} from './Header.js';
import {Catalog} from './Shop.js';
import {
  RenderedCollectionDetails,
  CollectionDescription,
  Collection
} from './Collection.js';

// Data
import data from '../collections.json';
const collections = data.collections;

// Pages as Classes
export class HomePage extends React.Component {
  render() {
    return (
      <div className={cx('page')}>
        <div className={cx('siteTitle')}>
          <h1>Value Link</h1>
        </div>
      </div>
    );
  }
}

export class AboutPage extends React.Component {
  render() {
    return (
      <div className={cx('page')}>
        <div className={cx('siteTitle')}>
          <h1>About Page</h1>
        </div>
        <p>Welcome to the about page...</p>
      </div>
    );
  }
}

export class ShopPage extends React.Component {
  render() {
    return (
      <div className={cx('page')}>
        <div className={cx('siteTitle')}>
          <h1>Shop</h1>
        </div>
        <Catalog />
      </div>
    );
  }
}

export class CollectionsPage extends React.Component {
  render() {

    if (!!this.props.children) {

    return (
      <div className={cx('page')}>
        {this.props.children}
      </div>
    );
    }
    else {
      return (
        <div className={cx('page')}>
          <div className={cx('siteTitle')}>
            <h1>Collections</h1>
          </div>
          {RenderedCollectionDetails}
        </div>
      );
    }
  }
}

export const collectionPages = {};

data.keys.map((name, i) => {
  
  let props = collections[name];
  
  collectionPages[name] = (parameterProps) => {
    return (
      <div className={cx('page')}>
        <div className={cx('siteTitle')}>
          <h1>The {props.attrs.title} Collection</h1>
        </div>
        <CollectionDescription name={props.attrs.title} noTitle {...props} />
        <h2>Items in Collection:</h2>
        <Collection name={props.attrs.title} noCommerce products={props.products} />
      </div>
    )
  }
  
});


export class NotFoundPage extends React.Component {
  render() {
    return (
      <div className={cx('page')}>
        <h4>Not found</h4>
      </div>
    );
  }
}

/**
 * NOTE: As of 2015-11-09 react-transform does not support a functional
 * component as the base compoenent that's passed to ReactDOM.render, so we
 * still use createClass here.
 */
export class App extends React.Component {
  static propTypes = {
    children: PropTypes.any,
  }
  render() {
    return (
      <div className={cx('App')}>
        <SiteHeader />
        {this.props.children}
      </div>
    );
  }
}
