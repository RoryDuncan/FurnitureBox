import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import classnames from 'classnames/bind';
import 'normalize.css';
import './styles/lib/skeleton.css';

// Using CSS Modules so we assign the styles to a variable
import s from './styles/App.styl';
const cx = classnames.bind(s);

export const Page = (props) => {
  
  let header = !props.hasHeader ? <SiteHeader /> : false;
  let footer = !props.hasFooter ? <SiteFooter /> : false;
  
  return (
    <main className={cx("page")}>
      {header}
      {props.children}
      {footer}
    </main>
  )
}