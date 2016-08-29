import React from 'react';
import ReactDOM from "react-dom";
import { Link, IndexLink } from 'react-router';
import collections from '../collections.json'

// styling
import classnames from 'classnames/bind';
import s from './styles/Catalog.styl';
const cx = classnames.bind(s);

// subcomponents
import {
  Collection,
  RenderedCatalog
} from './Collection.js';




// todo: Shopping Cart component

export class Catalog extends React.Component {
  
  constructor() {
    super();
    console.log(collections);

  }

  render(){
    return (
      <div className={cx("catalog")}>
        {RenderedCatalog}
      </div>
    )
  }
}

