import React from 'react';
import classnames from 'classnames/bind';
import s from '../components/styles/App.styl';
import Page from '../components/Page';
const cx = classnames.bind(s);

import {ContactForm, StamplaySDK} from '../components/ContactForm';


export class Contact extends React.Component {
  render() {
    
    let action = "https://value-link.stamplayapp.com/api/codeblock/v1/run/validatecontactfields";
    let method = "POST";
    
    return (
      <Page>
        <div className={cx('site-title')}>
          <h1>Contact</h1>
        </div>
        <ContactForm action={action} method={method} />
      </Page>
    );
  }
}
