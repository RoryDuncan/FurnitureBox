import React from 'react';
import classnames from 'classnames/bind';
import s from '../components/styles/App.styl';
import Page from '../components/Page';
import formatMessage from 'format-message';
const cx = classnames.bind( s );

// i18n
let pageTitle = formatMessage({ id: 'faq:page_title', default: 'Frequently Asked Questions', description: 'The Frequently Asked Questions Page\'s title' });
let pageDescription = formatMessage({ id: 'faq:description', default: 'Refer to the Questions and Answers below before. If you don\'t find your question contact us and we\'ll answer it.', description: 'The Frequently Asked Questions description text, describing what the FAQ is used for.' });
let faqEmptyMessage = formatMessage({ id: 'faq:no_questions_yet', default: 'We haven\'t been asked very many question yet.', description: 'The Frequently Asked Questions page text, before we add questions and answers to it.' });

export const FAQ = () => {
  return (
    <Page>
      <div className={cx( 'site-title' )}>
        <h1>{pageTitle}</h1>
      </div>
      <p>{pageDescription}</p>

      <p>{faqEmptyMessage}</p>
    </Page>
  );
};
