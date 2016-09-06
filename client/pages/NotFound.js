import React from 'react';
import classnames from 'classnames/bind';
import s from '../components/styles/App.styl';
import Page from '../components/Page';
const cx = classnames.bind(s);

export class NotFoundPage extends React.Component {
  render() {
    return (
      <Page>
        <h4>Not found</h4>
      </Page>
    );
  }
}