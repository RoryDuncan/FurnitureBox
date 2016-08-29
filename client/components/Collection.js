import React from 'react';
import ReactDOM from "react-dom";
import { Link, IndexLink } from 'react-router';

// styling
import classnames from 'classnames/bind';
import s from './styles/Collection.styl';
const cx = classnames.bind(s);

// sub-components
import {ProductItem} from './ProductItem.js';
import collections from '../collections.json';



//
//
export class Collection extends React.Component {
  constructor() {
    super();
  }
  
  render() {
    let slug = `/collections/${this.props.name}`;
    return (
      <div className={cx("collection-wrapper")}>
        
        <Link to={slug} >
          <h3 className={cx("title")}>{this.props.name}</h3>
        </Link>
        <div className={cx("collection")}>
          {this.props.items.map((item, i) =>{
            let props = item;
            return <ProductItem key={i} {...props} listed />
          })}
        </div>
      </div>
    )
  }
}

export const CollectionList = () => {
  return (
    <div className={cx("list-of-collections")}>
      {RenderedCollectionDetails}
    </div>
  )
};




//
//
export const CollectionDescription = (props) => {

  return (
    <div className={cx("collection")}>
      <h3 className={cx("collection-title")}>{props.name}</h3>
      <img className={cx("collection-image")} src="http://placehold.it/850x420" />
      <p className={cx("description")}>{props.description}</p>
      <p>More could probably go here...</p>
      <Link to={`/collections/${props.name}`} >Shop the {props.name} collection</Link>
    </div>
  )
};


/* Prerendered collection Components
  
  rendered and stored for react-static
*/


// generate our list of collections
// 
export const RenderedCatalog = Object.keys(collections).map((name, i) => {
  return (
    <Collection key={i} name={name} items={collections[name].items} />
  )
});

//
// 
export const RenderedCollectionDetails = Object.keys(collections).map((name, i) => {
  
  let props = {
    name: name,
    description: collections[name].description
  };
  return (
    <CollectionDescription key={i} {...props} />
  )
});
