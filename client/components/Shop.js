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
      <ShoppingCart />
      <hr />
      {RenderedCatalog}
      </div>
    )
  }
}

