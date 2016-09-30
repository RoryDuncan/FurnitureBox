import React from 'react';
import { Link } from 'react-router';
import collections from '../collections.json'

// styling
import classnames from 'classnames/bind';
import s from './styles/Shop.styl';
const cx = classnames.bind(s);

// subcomponents
import {
  Collection,
  RenderedCatalog
} from './Collection.js';

import {ShoppingCart, cart} from './ShoppingCart.js';

export class Catalog extends React.Component {
  
  constructor() {
    super();
  }

  render(){
    return (
      <div className={cx("catalog")}>
        <div className={cx("hero")}>
          <img className={cx('hero-img')} alt="FurnitureBox Hero Image" src="//placehold.it/1200x560" />
          <div className={cx("content")}>
            <div className={cx("hero-panel")}>
              <div className={cx("site-title")}>
                <h1>Furniture</h1>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("content")}>
          <ShoppingCart />
          {RenderedCatalog}
        </div>
      </div>
    )
  }
}

