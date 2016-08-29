import React from 'react';
import ReactDOM from "react-dom";
import { Link, IndexLink } from 'react-router';

// styling
import classnames from 'classnames/bind';
import s from './styles/Collection.styl';
const cx = classnames.bind(s);

// sub-components
import {ProductItem} from './ProductItem.js';


class Collection extends React.Component {
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

export default Collection;