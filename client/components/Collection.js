import React from 'react';
import ReactDOM from "react-dom";
import { Link, IndexLink } from 'react-router';

// styling
import classnames from 'classnames/bind';
import s from './styles/Collection.styl';
const cx = classnames.bind(s);


class Collection extends React.Component {
  constructor() {
    super();
  }
  
  render() {
    return (
      <div className={cx("collection")}>
        {this.props.children}
      </div>
    )
  }
}

// todo
Collection.propTypes = {
  name: React.propType.String
}