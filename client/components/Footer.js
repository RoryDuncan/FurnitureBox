import React from 'react';
import ReactDOM from "react-dom";
import { Link, IndexLink } from 'react-router';

// styling
import classnames from 'classnames/bind';
import s from './styles/Footer.styl';
const cx = classnames.bind(s);


export class SiteFooter extends React.Component {
  render(){
    return (
      <footer className={cx("site-footer")}>
        <div className={cx("details")}>&copy; Value-Link {(new Date()).getFullYear()}</div>
        <Navigation />
      </footer>
    )
  }
}

export class Navigation extends React.Component {
  render(){
    return(
      <nav className={cx('site-links')}>
        <ul>
          <li>
            <Link to="/how-we-work">How We Work</Link>
          </li>
          <li>
            <Link to="/transparency">Transparency</Link>
          </li>
        </ul>
      </nav>
    )
  }
}

