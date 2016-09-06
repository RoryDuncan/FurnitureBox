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
import {SiteFooter} from './Footer.js';
import {Catalog} from './Shop.js';
import {
  RenderedCollectionDetails,
  CollectionDescription,
  Collection
} from './Collection.js';

// Data
import data from '../collections.json';
const collections = data.collections;


export const Page = (props) => {
  
  let header = !props.hasHeader ? <SiteHeader /> : false;
  let footer = !props.hasFooter ? <SiteFooter /> : false;
  
  return (
    <main className={cx("page")}>
      {header}
      {props.children}
      {footer}
    </main>
  )
}



// Pages as Classes
export class HomePage extends React.Component {
  render() {
    return (
      <Page>
        <div className={cx('siteTitle')}>
          <h1>Value Link</h1>
          <p>This is the homepage of Value Link</p>
          <h2>Roadmap</h2>
          <p>The features and bugs that need apprehending</p>
          <ul>
            <li>
              Internationalization
              <ul>
                <li>Entire site</li>
                <li>Shopify Items: 
                  <a href="https://rory-value-link.myshopify.com/admin/themes/123704833/language" target="_blank">Shopify Language options here</a>
                </li>
              </ul>
            </li>
            <li>
              Cart persistance through Local Storage
            </li>
            <li>"Shop this Collection" button in &lt;CollectionDetails /&gt; Component</li>
            <li>Pages to add:
              <ul>
                <li>
                  <details>
                    <summary>How it Works page</summary>
                    <p>A page explaining how our processes work</p>
                  </details>
                </li>
                <li>
                  <details>
                      <summary>Transparency page</summary>
                      <p>A page discussing the transparency of our product.</p>
                  </details>
                </li>
                <li>
                  <details>
                    <summary>Administration Pages</summary>
                    <p>Page for controlling aspects of the rest of the site.</p>
                  </details>
                </li>
              </ul>
            </li>
            <li></li>
          </ul>
        </div>
      </Page>
    );
  }
}

export class AboutPage extends React.Component {
  render() {
    return (
      <Page>
        <div className={cx('siteTitle')}>
          <h1>About Page</h1>
        </div>
        <p>Welcome to the about page...</p>
      </Page>
    );
  }
}

export class ShopPage extends React.Component {
  render() {
    return (
      <Page>
        <div className={cx('siteTitle')}>
          <h1>Shop</h1>
        </div>
        <Catalog />
      </Page>
    );
  }
}

export class CollectionsPage extends React.Component {
  render() {

    if (!!this.props.children) {

    return (
      <Page>
        {this.props.children}
      </Page>
    );
    }
    else {
      return (
        <Page>
          <div className={cx('siteTitle')}>
            <h1>Collections</h1>
          </div>
          {RenderedCollectionDetails}
        </Page>
      );
    }
  }
}

export const collectionPages = {};

data.keys.map((name, i) => {
  
  let props = collections[name];
  
  collectionPages[name] = (parameterProps) => {
    return (
      <Page>
        <div className={cx('siteTitle')}>
          <h1>The {props.attrs.title} Collection</h1>
        </div>
        <CollectionDescription name={props.attrs.title} noTitle {...props} />
        <h2>Items in Collection:</h2>
        <Collection name={props.attrs.title} noCommerce products={props.products} />
      </Page>
    )
  }
  
});


export class NotFoundPage extends React.Component {
  render() {
    return (
      <Page>
        <h4>Not found</h4>
      </Page>
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
        {this.props.children}
      </div>
    );
  }
}
