import React from 'react';
import classnames from 'classnames/bind';
import s from '../components/styles/App.styl';
import Page from '../components/Page';
const cx = classnames.bind(s);
import formatMessage from 'format-message';

let pageTitle = formatMessage({
  id: "transparency:page_title",
  default: "Transparency",
  description: "The Transparency Page's title"
})

let contentParagraph = formatMessage({
  id: "transparency:content_paragraph",
  default: "todo",
  description: "The Transparency page's content paragraph, describing the transparency of our brand."
})

export class Transparency extends React.Component {
  render() {
    return (
      <Page>
        <div className={cx('site-title')}>
          <h1>{pageTitle}</h1>
        </div>
          <p>{contentParagraph}</p>
      </Page>
    );
  }
}