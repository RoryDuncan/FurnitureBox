import React from 'react';
import classnames from 'classnames/bind';
import s from '../components/styles/App.styl';
import Page from '../components/Page';
import {RenderedCollectionDetails} from '../components/Collection.js';
import formatMessage from 'format-message';

let pageTitle = formatMessage({
  id: "collections:page_title",
  default: "Collections",
  description: "The Collections Page's title"
})
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
            <h1>{pageTitle}</h1>
          </div>
          {RenderedCollectionDetails}
        </Page>
      );
    }
  }
}
