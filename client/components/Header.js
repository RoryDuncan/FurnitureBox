import React from 'react';
import ReactDOM from "react-dom";
import { Link, IndexLink } from 'react-router';
import formatMessage from 'format-message';

// styling
import classnames from 'classnames/bind';
import s from './styles/Header.styl';
const cx = classnames.bind(s);

// i18n

let brand = formatMessage({
  id: "header:brand_name",
  default: "Value-Link",
  description: "The Brand Name"
})

let navLinks = {
  
  home: formatMessage({
    id: "navigation:home_link_text",
    default: "Home",
    description: "The link text for navigating to the 'home' page."
  }),
  
  shop: formatMessage({
    id: "navigation:shop_link_text",
    default: "Shop",
    description: "The link text for navigating to the 'shop' page."
  }),
  
  about: formatMessage({
    id: "navigation:about_link_text",
    default: "About",
    description: "The link text for navigating to the 'about' page."
  }),
  
  collections: formatMessage({
    id: "navigation:collections_link_text",
    default: "Collections",
    description: "The link text for navigating to the 'collections' page."
  }),
  
  faq: formatMessage({
    id: "navigation:faq_link_text",
    default: "FAQ",
    description: "The link text for navigating to the 'faq' page."
  }),
  
  contact: formatMessage({
    id: "navigation:contact_link_text",
    default: "Contact",
    description: "The link text for navigating to the 'contact' page."
  })
}

export class SiteHeader extends React.Component {
  render(){
    return (
      <div className={cx("site-header")}>
        <div className={cx("brand")}>
          <i className="material-icons">widgets</i> {brand}
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
            <IndexLink to='/' activeClassName={cx('active')}>{navLinks.home}</IndexLink>
          </li>
          <li>
            <Link to='/shop' activeClassName={cx('active')}>{navLinks.shop}</Link>
          </li>
          <li>
            <Link to='/about' activeClassName={cx('active')}>{navLinks.about}</Link>
          </li>
          <li>
            <Link to='/collections' activeClassName={cx('active')}>{navLinks.collections}</Link>
          </li>
          <li>
            <Link to='/faq' activeClassName={cx('active')}>{navLinks.faq}</Link>
          </li>
          <li>
            <Link to='/contact' activeClassName={cx('active')}>{navLinks.contact}</Link>
          </li>
        </ol>
      </nav>
    )
  }
}

