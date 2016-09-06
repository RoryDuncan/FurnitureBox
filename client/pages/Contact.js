import React from 'react';
import classnames from 'classnames/bind';
import s from '../components/styles/App.styl';
import Page from '../components/Page';
const cx = classnames.bind(s);


export class Contact extends React.Component {
  render() {
    return (
      <Page>
        <div className={cx('site-title')}>
          <h1>Contact</h1>
        </div>
        <p>Feedback / Problem with order / Want to chat / Any question, ever</p>
        
      </Page>
    );
  }
}


export const LabelAndInput = (props) => {
  
  return (
    <div className="input-container">
    <label>
      
    </label>
    <input>
      
    </input>
    </div>
  )
}

export class ContactForm extends React.Component {
  
  constructor(){
    super();
  }
  
  render() {
    
    return (
      <div className={cx("contact-form")}>
        <h3>Contact</h3>
      </div>
    )
  }
  
}