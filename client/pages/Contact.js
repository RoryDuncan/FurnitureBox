import React from 'react';
import classnames from 'classnames/bind';
import s from '../components/styles/App.styl';
import Page from '../components/Page';
const cx = classnames.bind(s);

import {ContactForm} from '../components/ContactForm';


export class Contact extends React.Component {
  render() {
    return (
      <Page>
        <div className={cx('site-title')}>
          <h1>Contact</h1>
        </div>
        <p>Feedback / Problem with order / Want to chat / Any question, ever</p>
        <ContactForm action="https://value-link.stamplayapp.com/api/webhook/v1/contact/catch" method="POST" />
      </Page>
    );
  }
}
