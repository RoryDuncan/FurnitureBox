import React from 'react';
import classnames from 'classnames/bind';
import s from '../components/styles/App.styl';
import Page from '../components/Page';
const cx = classnames.bind(s);


export class FAQ extends React.Component {
  render() {
    return (
      <Page>
        <div className={cx('site-title')}>
          <h1>Frequently Asked Questions</h1>
        </div>
        <p>Lorum Ipsum</p>
        
        <ul>
          <li>
            <p>Question Answer</p>
          </li>
          <li>
            <p>Question Answer</p>
          </li>
          <li>
            <p>Question Answer</p>
          </li>
        </ul>
      </Page>
    );
  }
}