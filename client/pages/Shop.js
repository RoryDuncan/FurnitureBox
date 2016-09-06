import React from 'react';
import classnames from 'classnames/bind';
import s from '../components/styles/App.styl';
import Page from '../components/Page';
const cx = classnames.bind(s);
import {Catalog} from '../components/Shop.js';


export class ShopPage extends React.Component {
  render() {
    return (
      <Page>
        <div className={cx('siteTitle')}>
          <h1>Shop</h1>
        </div>
        <Catalog />
      </Page>
    );
  }
}