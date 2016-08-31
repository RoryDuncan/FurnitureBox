import React from 'react';
import ReactDOM from "react-dom";
import { Link, IndexLink } from 'react-router';

// styling
import classnames from 'classnames/bind';
import s from './styles/Header.styl';
const cx = classnames.bind(s);


export class SiteHeader extends React.Component {
  render(){
    return (
      <div className={cx("site-header")}>
        <div className={cx("brand")}>
          <i className="material-icons">widgets</i> Value-Link
        </div>
        <Navigation />
      </div>
    )
  }
}

export class Navigation extends React.Component {
  render(){
    return(
      <nav className={cx('nav')}>
        <ol>
          <li>
            <IndexLink to='/' activeClassName={cx('active')}>Home</IndexLink>
          </li>
          <li>
            <Link to='/about' activeClassName={cx('active')}>About</Link>
          </li>
          <li>
            <Link to='/catalog' activeClassName={cx('active')}>Catalog</Link>
          </li>
          <li>
            <Link to='/collections' activeClassName={cx('active')}>Collections</Link>
          </li>
          <li>
            <Link to='/faq' activeClassName={cx('active')}>FAQ</Link>
          </li>
          <li>
            <Link to='/contact' activeClassName={cx('active')}>Contact</Link>
          </li>
          <li>
            <Link to='/account' activeClassName={cx('active')}>Account</Link>
          </li>
        </ol>
      </nav>
    )
  }
}

