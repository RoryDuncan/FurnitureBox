import React from 'react';
import { Link } from 'react-router';

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
  
  submit() {
    
  }
  
  render() {
    
    return (
      <div className={cx("contact-form")}>
        <h3>Contact</h3>
      </div>
    )
  }
  
}