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
  
  
}

// styling
import classnames from 'classnames/bind';
import s from './styles/Footer.styl';
const cx = classnames.bind(s);


export class SiteFooter extends React.Component {
  render(){
    return (
      <footer className={cx("site-footer")}>
        <div className={cx("details")}>&copy; {siteName} {(new Date()).getFullYear()}</div>
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
            <Link to="/how-we-work">{footerNav.howWeWork}</Link>
          </li>
          <li>
            <Link to="/transparency">{footerNav.transparency}</Link>
          </li>
        </ul>
      </nav>
    )
  }
}

