import React from 'react';
import classnames from 'classnames/bind';
import s from '../components/styles/App.styl';
import Page from '../components/Page';
import {RenderedCollectionDetails} from '../components/Collection.js';

const cx = classnames.bind(s);

export class Collections extends React.Component {
  render() {

    if (!!this.props.children) {

    return (
      <Page>
        {this.props.children}
      </Page>
    );
    }
    else {
      return (
        <Page>
          <div className={cx('site-title')}>
            <h1>Collections</h1>
          </div>
          {RenderedCollectionDetails}
        </Page>
      );
    }
  }
}
