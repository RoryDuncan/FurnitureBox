import React from 'react';
import classnames from 'classnames/bind';
import s from '../components/styles/App.styl';
import Page from '../components/Page';
const cx = classnames.bind(s);


export class Transparency extends React.Component {
  render() {
    return (
      <Page>
        <div className={cx('site-title')}>
          <h1>Transparency</h1>
        </div>
        <p>
        
        </p>
      </Page>
    );
  }
}