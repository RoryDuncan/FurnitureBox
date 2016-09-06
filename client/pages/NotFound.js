import React from 'react';
import {Link} from 'react-router';
import classnames from 'classnames/bind';
import s from '../components/styles/App.styl';
import Page from '../components/Page';
const cx = classnames.bind(s);

export class NotFound extends React.Component {
  render() {
    return (
      <Page>
        
        <h1>
          That Page Wasn't Found.
        </h1>
        <h4>A <code>404 Error</code> Occurred</h4>
        <p>404 Errors happen when a URL is incorrect, or a page that once existed was moved.</p>
        <h4>How to Continue</h4>
        <ul>
          <li>Double-check that the URL is correct (i.e., <code>/shop</code> and not <code>/shpo</code>)</li>
          <li>If the page <em>should</em> be available, <Link to="/contact">let us know you ran into this problem</Link></li>
          <li>Forget this ever happened. <Link to="/">Return to the main site</Link></li>
        </ul>
      </Page>
    );
  }
}