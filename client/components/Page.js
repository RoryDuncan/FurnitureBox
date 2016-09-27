import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import classnames from 'classnames/bind';
import 'normalize.css';
import './styles/lib/skeleton.css';
import {SiteHeader} from './Header.js';
import {SiteFooter} from './Footer.js';

// Using CSS Modules so we assign the styles to a variable
import s from './styles/Page.styl';
const cx = classnames.bind(s);

export const Page = (props) => {
  
  let header = !props.hasHeader ? <SiteHeader /> : false;
  let footer = !props.hasFooter ? <SiteFooter /> : false;
  
  return (
    <main className={cx("page")}>
      {header}
      <main className={cx("page-content")}>
        {props.children}
      </main>
      {footer}
    </main>
  )
}

export default Page;