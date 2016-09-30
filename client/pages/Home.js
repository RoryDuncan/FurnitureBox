import React from 'react';
import classnames from 'classnames/bind';
import s from '../components/styles/Home.styl';
const cx = classnames.bind(s);
import Page from '../components/Page';
import formatMessage from 'format-message';

let pageTitle = formatMessage({
  id: "home:page_title",
  default: "Value Link",
  description: "The Home Page's title"
})

let pageDescription = formatMessage({
  id: "home:page_description",
  default: "This is the homepage of Value Link",
  description: "The Home Page's description or Value Link's business motto"
})


export class Home extends React.Component {
  render() {
    return (
      <Page>
        <div className={cx('site-title')}>
          <div className={cx('hero')}>
            <img className={cx('hero-img')} alt="FurnitureBox Hero Image" src="//placehold.it/1200x560" />
            
          </div>
          <div className={cx("content")}>
            <h1>{pageTitle}</h1>
            <p>{pageDescription}</p>
          
            <h2>Roadmap</h2>
            <p>The features and bugs that need apprehending</p>
            <ul>
              <li>
                Internationalization
                <ul>
                  <li>Shopify Items: 
                    <a href="https://rory-value-link.myshopify.com/admin/themes/123704833/language" target="_blank">Shopify Language options here</a>
                  </li>
                </ul>
              </li>
              <li>
                Cart persistance through Local Storage
              </li>
              <li>Stylize Site</li>
            </ul>
          </div>
        </div>
      </Page>
    );
  }
}