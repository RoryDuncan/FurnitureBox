import React from 'react';
import classnames from 'classnames/bind';
import s from './styles/Forms.styl';
const cx = classnames.bind(s);
/* global fetch */
// import 'isomorphic-fetch';
import './images/ring-alt.gif';

/* fetch / ajax helpers */
const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

const parseJSON = (response) => {
  return response.json()
}


/* Stateless components*/

const LoadingSpinner = () => {
  return <img className={cx("loading-spinner")} src="ring-alt.gif" alt="Sending your message" />
}

const ErrorField = (props) => {
  return (
    <div className={cx("validation-error")}>
      <i className="material-icons">&#xE001;</i>
      {props.message}
    </div>
  )
}

const WarningField = (props) => {
  return (
    <div className={cx("validation-warning")}>
      <i className="material-icons">&#xE88F;</i>
      {props.message}
    </div>
  )
}

/* components */

export class LabelAndInput extends React.Component {
  
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.isValid = this.isValid.bind(this);
    this.state = {
      isEmpty: false,
      isInvalid: false
    }
  }
  
  onChange(e) {
    e.target.checkValidity();
    if (this.state.isInvalid) { this.setState({isInvalid: false}); }
    if (this.state.isEmpty) { this.setState({isEmpty: false}); }
    // if (e.target.reportValidity) e.target.reportValidity();
    if (this.props.onChange) this.props.onChange(e);
    
  }
  
  isValid() {
    return this.refs.input.validity.valid
  }
  
  render() {
    
    
    let error = null;
    if (this.state.isInvalid) {
      error = (
        <ErrorField message="The email you entered is invalid." />
      )
    }
    
    if (this.state.isEmpty) {
      error = (
        <ErrorField message="Your name can not be empty." />
      )
    }
    
    let required = this.props.required || null;
    let defaultValue = this.props.value || null;
    return (
      <div className={cx("input-container")}>
        <label ref="label">
          {this.props.label}
        </label>
        <input 
          type={this.props.type} 
          onChange={this.onChange}
          required={required}
          defaultValue={defaultValue}
          ref="input"
        />
        {error}
      </div>
    )
    
  }
}

export class TextArea extends LabelAndInput {
  
  constructor() {
    super();
    this.state = {
      isEmpty: false
    }
  }
  
  onChange() {
    // reset validation state
    if (this.state.isEmpty) { this.setState({isEmpty: false});}
  }
  
  render() {
    
    let error = null;
    
    if (this.state.isEmpty) {
      error = <ErrorField message="Your message is empty." />
      
    }
    
    let required = this.props.required || null;
    let defaultValue = this.props.value || null;
    return (
      <div>
        <label>{this.props.label}</label>
        <textarea 
          ref="textarea" 
          onChange={this.onChange} 
          defaultValue={defaultValue} 
          required={required}></textarea>
        {error}
      </div>
    )
  }
  
}

export class DropdownMenu extends LabelAndInput {
  
  constructor() {
    super();
    this.state = {
      isInvalid: false
    }
  }
  
  onChange(e) {
    
    // reset validity states
    if (this.state.isInvalid) { this.setState({isInvalid: false}); }
    if (this.props.onChange) this.props.onChange(e);
  }
  
  render() {
    
    let options = this.props.children;
    let defaultValue = this.props.value || null;
    
    let error = null;
    
    if (this.state.isInvalid) {
      error =  <ErrorField message="The reason you provided is invalid. Use the dropdown menu to select a reason." />
    }
    
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
        <select ref="select" 
          onChange={this.onChange} 
          defaultValue={defaultValue}>
          {options}
        </select>
        {error}
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
    this.getFormData = this.getFormData.bind(this);
    this.postSubmitDetermineState = this.postSubmitDetermineState.bind(this);
    this.updateFormComponentsWithErrors = this.updateFormComponentsWithErrors.bind(this);
    
    this.state = {
      loading: false,
      submitted: false,
      hasErrors: false,
      errorDetails: null
    };
  }
  
  checkValidity() {
    let result = this.refs.form.checkValidity()
    if (this.refs.form.reportValidity) { 
      this.refs.form.reportValidity()
    }
    
    return result;
  }
  
  getFormData() {
    
    let that = this;
    
    let data = {
      'name': that.refs.name.refs.input.value,
      'email': that.refs.email.refs.input.value,
      'message': that.refs.message.refs.textarea.value,
      'reason': that.refs.reason.refs.select.value
    };
    
    return data;
    
  }
  
  onChange(e) {
    this.checkValidity();
  }
  
  postSubmitDetermineState(response) {
    let nextState = {
      loading: false
    }
    
    if (response.ok) {
      nextState.submitted = true;
      nextState.hasErrors = false;
    } else {
      nextState.hasErrors = true;
      this.updateFormComponentsWithErrors(response.errorDetails);
    }
    this.setState(nextState);
  }
  
  updateFormComponentsWithErrors(errorDetails) {
    
    // trickle our errors down via refs
    this.refs.name.setState({isEmpty: errorDetails.name.isEmpty});
    this.refs.message.setState({isEmpty: errorDetails.message.isEmpty});
    this.refs.email.setState({isInvalid: errorDetails.email.isInvalid});
    this.refs.reason.setState({isInvalid: errorDetails.reason.isInvalid});

  }
  
  onSubmit(e) {
    e.preventDefault();
    
    this.setState({loading: true});
    this.checkValidity();
    let data = this.getFormData();
    let action = this.refs.form.action;
    let method = this.refs.form.method.toUpperCase();
    let options = {
      'method': method,
      'headers': {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify(data)
    };
    
    fetch(action, options)
      .then(checkStatus)
      .then(parseJSON)
      .then(this.postSubmitDetermineState)
      .catch((err) => {
        console.error(err, err.message);
      });
    
    
    
    return data
  }
  
  render() {
    
    let errors = null;
    let formClasses = {
      "contact-form": true,
      "loading": this.state.loading
    }
    
    let submitText = "Send";
    let loadingImage = <LoadingSpinner />;
    
    if (this.state.loading) {
      submitText = "Sending...";
    } else {
      loadingImage = null;
    }
    
    if (this.state.hasErrors) {
      errors = <WarningField message="The information you submitted has errors. Please fix them, and then resubmit the form." />
    } else if (this.state.submitted) {
      return (
        <div>
          <h3>Your message was successfully sent!</h3>
          <p>Thanks for reaching out, we will get back to you as fast as we can!</p>
        </div>
      );
    }
    
    return (
      <form onSubmit={this.onSubmit}  ref="form" action={this.props.action} method={this.props.method} className={cx(formClasses)}>
        <h3>Send A Message</h3>
        <h5>Your Information</h5>
        {errors}
        <DropdownMenu 
          ref="reason" 
          label="Reason for Contact" 
          value="saying-hello">
            <option value="saying-hello">Saying Hello</option>
            <option value="problem">Problem with Order</option>
            <option value="question">I Have a Question</option>
            <option value="feedback">Feedback</option>
        </DropdownMenu>
      
        <LabelAndInput ref="name" label="Name" type="text"  />
        <LabelAndInput ref="email" label="Email" type="email"  />
        <TextArea label="Message" ref="message" />
        
        <button type="submit">
          {submitText} {loadingImage}
        </button>
      </form>
    )
  }
  
}