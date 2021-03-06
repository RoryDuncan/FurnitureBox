import React from 'react';
import classnames from 'classnames/bind';
import s from '../components/styles/App.styl';
import Page from '../components/Page';
const cx = classnames.bind( s );
import formatMessage from 'format-message';

import { ContactForm } from '../components/ContactForm';

let pageTitle = formatMessage({ id: 'contact:page_title', default: 'Contact', description: 'The Contact Page\'s title' });

export const Contact = () => {
  return (
    <Page>
      <div className={cx( 'site-title' )}>
        <h1>{pageTitle}</h1>
      </div>
      <ContactForm action='https://value-link.stamplayapp.com/api/codeblock/v1/run/validatecontactfields' method='POST' />
    </Page>
  );
};
