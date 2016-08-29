import React from 'react';
import ReactDOM from "react-dom";
import { Link, IndexLink } from 'react-router';
import collections from '../collections.json'

// styling
import classnames from 'classnames/bind';
import s from './styles/Catalog.styl';
const cx = classnames.bind(s);

// subcomponents
import Collection from './Collection.js';


// generate our list of collections
// render and store preemptively so react-static can handle the love
const collectionList = Object.keys(collections).map((name, i) => {
  return (
    <Collection key={i} name={name} items={collections[name].items} />
  )
});

// todo: Shopping Cart component

export class Catalog extends React.Component {
  
  constructor() {
    super();
    this.update = this.update.bind(this);

  }

  render(){

    return (
      <div className={cx("catalog")}>
        {collectionList}
      </div>
    )
  }
}
