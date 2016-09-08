import React from 'react';
import classnames from 'classnames/bind';
import s from './styles/Forms.styl';
const cx = classnames.bind(s);

export class LabelAndInput extends React.Component {
  
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.isValid = this.isValid.bind(this);
  }
  
  onChange(e) {
    console.log(e.target.value);
    e.target.checkValidity();
    if (e.target.reportValidity) e.target.reportValidity();
    if (this.props.onChange) {
      this.props.onChange(e)
    }
  }
  
  isValid() {
    return this.refs.input.validity.valid
  }
  
  render() {
    
    let required = this.props.required || null;
    
    return (
      <div className={cx("input-container")}>
        <label ref="label">
          {this.props.label}
        </label>
        <input 
          type={this.props.type} 
          onChange={this.onChange}
          required={required}
          ref="input"
        />
      </div>
    )
    
  }
}

export class TextArea extends LabelAndInput {
  
  constructor() {
    super();
  }
  
  onChange() {
  
  }
  
  render() {
    let required = this.props.required || null;
    return (
      <div>
        <label>{this.props.label}</label>
        <textarea onChange={this.onChange} required={required}>{this.props.defaultValue}</textarea>
      </div>
    )
  }
  
}

export class DropdownMenu extends LabelAndInput {
  
  constructor() {
    super();

  }
  
  onChange(e) {
    console.log("dropdown changed to", e.target.value)
  }
  
  isValid() {
    
  }
  
  render() {
    
    let options = this.props.children;
    
    // if the options property is passed, use it, otherwise default to 
    // this.props.children
    if (this.props.options) {
      let options = this.props.options;
      let keys = Object.keys(options);
      options = keys.map((key, i) => {
        let value = options[key];
        return (<option key={i} value={value}>{key}</option>)
      })
    }
    
    return (
      <div className={cx("input-container")}>
        <label ref="label">{this.props.label}</label>
        <select ref="select" onChange={this.onChange}>
          {options}
        </select> 
      </div>
    )
  }
}

export class ContactForm extends React.Component {
  
  constructor(){
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.checkValidity = this.checkValidity.bind(this);
    
    this.state = {
      submitted: false
    }
  }
  
  checkValidity() {
    return this.refs.form.checkValidity()
  }
  
  isValid() {
    
  }
  
  onChange(e) {
    this.checkValidity();
  }
  
  onSubmit(e) {
    console.log(this);
    console.log("Form valid:", this.refs.form.checkValidity())
    
    return this.refs.form.checkValidity()
  }
  
  render() {
    
    return (
      <form onSubmit={this.onSubmit}  ref="form" action={this.props.action} method={this.props.method} className={cx("contact-form")}>
        <h3>Send A Message</h3>
        <h5>Your Information</h5>
        <p>Filling out the 'Reason for Contact' below will help us filter your message to the correct channel, so you can be helped accordingly</p>
        <DropdownMenu label="Reason for Contact">
          <option value="saying-hello">Saying Hello</option>
          <option value="problem">Problem with Order</option>
          <option value="question">I Have a Question</option>
          <option value="feedback">Feedback</option>
        </DropdownMenu>
      
        <LabelAndInput onChange={this.onChange} label="Name" type="text" value="" required />
        <LabelAndInput onChange={this.onChange} label="Email" type="email" value="" required />
        <TextArea label="Message" required />
        
        <input type="submit" value="Send" />
      </form>
    )
  }
  
}