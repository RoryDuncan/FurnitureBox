import React from 'react';
import classnames from 'classnames/bind';
import s from '../components/styles/App.styl';
import Page from '../components/Page';
import formatMessage from 'format-message';
const cx = classnames.bind(s);

// i18n
let pageTitle = formatMessage({
  id: 'about:page_title',
  default: 'About',
  description: 'The About Page\'s title',
});

let bodyText = formatMessage({
  id: 'about:body_text',
  default: 'Welcome to the about page',
  description: 'The About Page\'s body text',
});


export const About = () => {
  return (
    <Page>
      <div className={cx('site-title')}>
        <h1>{pageTitle}</h1>
      </div>
      <p>{bodyText}</p>
    </Page>
  );
};
