import React from 'react';
import classnames from 'classnames/bind';
import s from '../components/styles/App.styl';
import Page from '../components/Page';
import formatMessage from 'format-message';
const cx = classnames.bind( s );

let pageTitle = formatMessage({ id: 'how_we_work:page_title', default: 'How We Work', description: 'The How We Work Page\'s title' });
let pageDescription = formatMessage({ id: 'how_we_work:page_description', default: 'Learn the intricate processes of Value Link', description: 'The How We Work Page\'s description' });
let contentParagraph = formatMessage({ id: 'how_we_work:how_we_work_paragraph1', default: 'How We Work', description: 'The How We Work Page\'s title' });

export const HowWeWork = () => {
  return (
    <Page>
      <div className={cx( 'site-title' )}>
        <h1>{pageTitle}</h1>
      </div>
      <p>{pageDescription}</p>
      <p>{contentParagraph}</p>
    </Page>
  );
};
