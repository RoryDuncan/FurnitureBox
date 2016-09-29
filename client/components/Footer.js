import React from 'react';
import ReactDOM from "react-dom";
import { Link, IndexLink } from 'react-router';
import formatMessage from 'format-message';

let siteName = formatMessage({
  id: "footer:site_name",
  default: "FurnitureBox",
  description: "The text before the copyright symbol, at the footer of the page."
})

let footerNav = {
  
  howWeWork: formatMessage({
    id: "navigation:how_we_work_link_text",
    default: "How We Work",
    description: "The link text for navigating to the 'How We Work' page."
  }),
  
  transparency: formatMessage({
    id: "navigation:transparency_link_text",
    default: "Transparency",
    description: "The link text for navigating to the 'Transparency' page."
  }),
  
  termsOfUse: formatMessage({
    id: "navigation:termsofuse_link_text",
    default: "Terms of Use",
    description: "The link text for navigating to the 'Terms of Use' page."
  }),
  
  privacy: formatMessage({
    id: "navigation:privacy_link_text",
    default: "Privacy Policy",
    description: "The link text for navigating to the 'Privacy Policy' page."
  }),
  
  
}

// styling
import classnames from 'classnames/bind';
import s from './styles/Footer.styl';
const cx = classnames.bind(s);


// stateless seperator
const Sep = () => {
  return (
    <span aria-hidden className={cx("sep")}>|</span>
  )
}

export class SiteFooter extends React.Component {
  render(){
    return (
      <footer className={cx("site-footer")}>
        <div className="content">
          <h5 className={cx("footer-title")}>{siteName}</h5>
          <div className={cx("navigation-regions")}>
            
            <Navigation title="Need Help?">
              <Link to="/how-we-work">{footerNav.howWeWork}</Link>
              <Link to="/transparency">{footerNav.transparency}</Link>
            </Navigation>
            
            <Navigation title="Explore">
              <Link to="/how-we-work">{footerNav.howWeWork}</Link>
              <Link to="/transparency">{footerNav.transparency}</Link>
            </Navigation>
          </div>
          <div className={cx("details")}>
            <div className="info-links">
              <Link to="/terms-of-use">{footerNav.termsOfUse}</Link>
              <Sep />
              <Link to="/privacy">{footerNav.privacy}</Link>
              <Sep />
              <span>&copy; {siteName} {(new Date()).getFullYear()}</span>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export class Navigation extends React.Component {
  constructor(){
    super();
  }
  
  render(){
    
    // wrap each child in a list item
    
    return (
      <nav className={cx('navigation-region', 'site-links')}>
        <h5 className={cx('title')}>{this.props.title}</h5>
        <ul>
          {this.props.children.map((el, i) => {
            return (<li key={i}>{el}</li>)
          })}
        </ul>
      </nav>
    )
  }
}

