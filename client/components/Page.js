import React, { PropTypes } from 'react';
import classnames from 'classnames/bind';
import 'normalize.css';
import './styles/lib/skeleton.css';
import { SiteHeader } from './Header.js';
import { SiteFooter } from './Footer.js';

// Using CSS Modules so we assign the styles to a variable
import s from './styles/Page.styl';
const cx = classnames.bind( s );

export const Page = ( props ) => {

  let header = props.hasHeader ? null : <SiteHeader />;
  let footer = props.hasFooter ? null : <SiteFooter />;

  return (
    <main className={cx( 'page' )}>
      {header}
      {props.children}
      {footer}
    </main>
  );
};

Page.propTypes = {
  hasFooter: PropTypes.bool,
  hasHeader: PropTypes.bool,
  children: PropTypes.node,
};

export default Page;
