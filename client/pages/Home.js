import React from 'react';
import classnames from 'classnames/bind';
import s from '../components/styles/App.styl';
const cx = classnames.bind(s);
import Page from '../components/Page';

export class Home extends React.Component {
  render() {
    return (
      <Page>
        <div className={cx('site-title')}>
          <h1>Value Link</h1>
          <p>This is the homepage of Value Link</p>
          <h2>Roadmap</h2>
          <p>The features and bugs that need apprehending</p>
          <ul>
            <li>
              Internationalization
              <ul>
                <li>Entire site</li>
                <li>Shopify Items: 
                  <a href="https://rory-value-link.myshopify.com/admin/themes/123704833/language" target="_blank">Shopify Language options here</a>
                </li>
              </ul>
            </li>
            <li>
              Cart persistance through Local Storage
            </li>
            <li>Pages to add:
              <ul>
                <li>
                  <details>
                    <summary>How it Works page</summary>
                    <p>A page explaining how our processes work</p>
                  </details>
                </li>
                <li>
                  <details>
                      <summary>Transparency page</summary>
                      <p>A page discussing the transparency of our product.</p>
                  </details>
                </li>
                <li>
                  <details>
                    <summary>Administration Pages</summary>
                    <p>Page for controlling aspects of the rest of the site.</p>
                  </details>
                </li>
              </ul>
            </li>
            <li>Stylize Site</li>
            <li>Build Functional Contact Page with StamPlay</li>
          </ul>
        </div>
      </Page>
    );
  }
}