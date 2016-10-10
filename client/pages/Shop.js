import React from 'react';
import classnames from 'classnames/bind';
import s from '../components/styles/App.styl';
import Page from '../components/Page';
const cx = classnames.bind(s);
import { Catalog } from '../components/Shop.js';
import formatMessage from 'format-message';

// i18n
let pageTitle = formatMessage({
  id: 'shop:page_title',
  default: 'Shop',
  description: 'The Shop Page\'s title',
});

export const Shop = () => {
  return (
    <Page>
      <div className={cx('site-title')}>
        <h1>{pageTitle}</h1>
      </div>
      <Catalog />
    </Page>
  );
}
