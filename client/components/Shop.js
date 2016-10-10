import React from 'react';

// styling
import classnames from 'classnames/bind';
import s from './styles/Shop.styl';
const cx = classnames.bind( s );

// subcomponents
import { RenderedCatalog } from './Collection.js';

import { ShoppingCart } from './ShoppingCart.js';

export class Catalog extends React.Component {

  constructor( props ) {
    super( props );
  }

  render() {
    return (
      <div className={cx( 'catalog' )}>
        <ShoppingCart/> {RenderedCatalog}
      </div>
    );
  }
}
