import React, { PropTypes } from 'react';
import classnames from 'classnames/bind';
import s from './styles/Forms.styl';
import formatMessage from 'format-message';
const cx = classnames.bind( s );
/* global fetch */
// import 'isomorphic-fetch';
import './images/ring-alt.gif';

/* fetch / ajax helpers */
const checkStatus = ( response ) => {
  if ( response.status >= 200 && response.status < 300 ) {
    return response;
  } else {
    const error = new Error( response.statusText );
    error.response = response;
    throw error;
  }
};

const parseJSON = ( response ) => {
  return response.json();
};

// i18n
let loadingSpinnerAltText = formatMessage({ id: 'contact:loading_spinner_alttext', default: 'Sending your message', description: 'Screen Reader / Alternative text for a loading spinner, while sending a message.' });
let invalidEmail = formatMessage({ id: 'contact:validation_invalid_email', default: 'The email you entered is invalid.', description: 'Error message displayed when a contact form is attempted to be sent with an invalid email address field.' });
let invalidName = formatMessage({ id: 'contact:validation_invalid_name', default: 'Your name can not be empty.', description: 'Error message displayed when a contact form is attempted to be sent with an invalid name field.' });
let invalidReason = formatMessage({ id: 'contact:validation_invalid_reason', default: 'The reason you provided is invalid. Use the dropdown menu to select a reason.', description: 'Error message displayed when a contact form is attempted to be sent with an invalid reason.' });
let invalidMessage = formatMessage({ id: 'contact:validation_invalid_message', default: 'Your message is empty.', description: 'Error message displayed when a contact form is attempted to be sent with an empty message field.' });
let formIsInvalidWarning = formatMessage({ id: 'contact:validation_form_has_errors', default: 'The information you submitted has errors. Please fix them, and then resubmit the form.', description: 'Error message displayed when a contact form is attempted to be sent while it\'s fields contain errors.' });
let sendMessageBtnText = formatMessage({ id: 'contact:send_message_btn', default: 'Send', description: 'The button text for submitting a contact form, resulting in a sent message.' });
let sendingMessageBtnText = formatMessage({ id: 'contact:sending_message_btn', default: 'Sending...', description: 'The button text after clicking to submit a contact form. The user is waiting for a response from the server' });
let messageSentText = formatMessage({ id: 'contact:message_sent', default: 'Your message was successfully sent!', description: 'Text notifying the user that their message was sent without any errors or problems.' });
let messageSentDetails = formatMessage({ id: 'contact:message_sent_details', default: 'Thanks for reaching out, we will get back to you as fast as we can!', description: 'Text giving the user information on what to expect after a message was sent.' });
let ContactFormTitle = formatMessage({ id: 'contact:contact_form_title', default: 'Send A Message', description: 'The title to the contact form, letting the user know what the form does.' });

/* Stateless components*/

const LoadingSpinner = () => {
  return <img className={cx( 'loading-spinner' )} src='ring-alt.gif' alt={loadingSpinnerAltText} />;
};

const ErrorField = ( props ) => {
  return (
    <div className={cx( 'validation-error' )}>
      <i className='material-icons'>&#xE001;</i>
      {props.message}
    </div>
  );
};

ErrorField.propTypes = {
  message: PropTypes.string,
};

const WarningField = ( props ) => {
  return (
    <div className={cx( 'validation-warning' )}>
      <i className='material-icons'>&#xE88F;</i>
      {props.message}
    </div>
  );
};

WarningField.propTypes = {
  message: PropTypes.string,
};

/* components */

export class LabelAndInput extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    required: PropTypes.bool,
    value: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
  }
  constructor( props ) {
    super( props );

    this.state = {
      isEmpty: false,
      isInvalid: false,
    };

    this.onChange = this.onChange.bind( this );
    this.isValid = this.isValid.bind( this );
  }

  onChange( e ) {
    e.target.checkValidity();
    if ( this.state.isInvalid ) {
      this.setState({ isInvalid: false });
    }
    if ( this.state.isEmpty ) {
      this.setState({ isEmpty: false });
    }
    // if (e.target.reportValidity) e.target.reportValidity();
    if ( this.props.onChange ) {
      this.props.onChange( e );
    }
  }

  isValid() {
    return this.refs.input.validity.valid;
  }

  render() {

    let error = null;

    if ( this.state.isInvalid ) {
      error = ( <ErrorField message={invalidEmail}/> );
    }

    if ( this.state.isEmpty ) {
      error = ( <ErrorField message={invalidName}/> );
    }

    let required = this.props.required || null;
    let defaultValue = this.props.value || null;

    return (
      <div className={cx( 'input-container' )}>
        <label ref='label'>
          {this.props.label}
        </label>
        <input type={this.props.type} onChange={this.onChange} required={required} defaultValue={defaultValue} ref='input'/>
        {error}
      </div>
    );

  }
}

export class TextArea extends LabelAndInput {

  constructor( props ) {
    super( props );

    this.state = {
      isEmpty: false,
    };
  }

  onChange() {
    // reset validation state
    if ( this.state.isEmpty ) {
      this.setState({ isEmpty: false });
    }
  }

  render() {
    let error = null;
    let required = this.props.required || null;
    let defaultValue = this.props.value || null;

    if ( this.state.isEmpty ) {
      error = <ErrorField message={invalidMessage}/>;
    }

    return (
      <div>
        <label>{this.props.label}</label>
        <textarea ref='textarea' onChange={this.onChange} defaultValue={defaultValue} required={required}></textarea>
        {error}
      </div>
    );
  }

}

export class DropdownMenu extends LabelAndInput {
  constructor( props ) {
    super( props );

    this.state = {
      isInvalid: false,
    };
  }

  onChange( e ) {

    // reset validity states
    if ( this.state.isInvalid ) {
      this.setState({ isInvalid: false });
    }
    if ( this.props.onChange ) {
      this.props.onChange( e );
    }
  }

  render() {
    let options = this.props.children;
    let defaultValue = this.props.value || null;
    let error = null;

    if ( this.state.isInvalid ) {
      error = <ErrorField message={invalidReason}/>;
    }

    // if the options property is passed, use it, otherwise default to
    // this.props.children
    if ( this.props.options ) {
      let options = this.props.options;
      let keys = Object.keys( options );
      options = keys.map(( key, i ) => {
        let value = options[key];
        return (
          <option key={i} value={value}>{key}</option>
        );
      });
    }

    return (
      <div className={cx( 'input-container' )}>
        <label ref='label'>{this.props.label}</label>
        <select ref='select' onChange={this.onChange} defaultValue={defaultValue}>
          {options}
        </select>
        {error}
      </div>
    );
  }
}

// i18n

let reasonForContactDropdown = {
  label: formatMessage({ id: 'contact:reason_for_contact_dropdown_label', default: 'Reason for Contact', description: 'Text for a dropdown menu with options describing why they\'re contacting us' }),
  hello: formatMessage({ id: 'contact:reason_for_contact_dropdown_option_saying_hello', default: 'Saying Hello', description: 'Text for a dropdown menu option, in which the user is contacting us to \'say hello\'' }),
  problemWithOrder: formatMessage({ id: 'contact:reason_for_contact_dropdown_option_problem', default: 'Problem with Order', description: 'Text for a dropdown menu option, in which the user is contacting us about a problem with their order' }),
  question: formatMessage({ id: 'contact:reason_for_contact_dropdown_option_question', default: 'I Have a Question', description: 'Text for a dropdown menu option, in which the user wants to ask a question or get more information' }),
  feedback: formatMessage({ id: 'contact:reason_for_contact_dropdown_option_feedback', default: 'Give Feedback', description: 'Text for a dropdown menu option, in which the user wants to provide feedback about anything related to our service or product' }),
};

let nameFieldLabel = formatMessage({ id: 'contact:name_field_label', default: 'Name', description: 'The label for the input where the user inputs their name.' });
let emailFieldLabel = formatMessage({ id: 'contact:email_field_label', default: 'Email', description: 'The label for the input where the user inputs their email address.' });
let messageFieldLabel = formatMessage({ id: 'contact:message_field_label', default: 'Message', description: 'The label for the text area where the user types their message.' });

export class ContactForm extends React.Component {
  static propTypes = {
    action: PropTypes.string,
    method: PropTypes.string,
  }
  constructor( props ) {
    super( props );

    this.state = {
      loading: false,
      submitted: false,
      hasErrors: false,
      errorDetails: null,
    };

    this.onSubmit = this.onSubmit.bind( this );
    this.onChange = this.onChange.bind( this );
    this.checkValidity = this.checkValidity.bind( this );
    this.getFormData = this.getFormData.bind( this );
    this.postSubmitDetermineState = this.postSubmitDetermineState.bind( this );
    this.updateFormComponentsWithErrors = this.updateFormComponentsWithErrors.bind( this );
  }

  checkValidity() {
    let result = this.refs.form.checkValidity();

    if ( this.refs.form.reportValidity ) {
      this.refs.form.reportValidity();
    }

    return result;
  }

  getFormData() {

    let that = this;

    let data = {
      'name': that.refs.name.refs.input.value,
      'email': that.refs.email.refs.input.value,
      'message': that.refs.message.refs.textarea.value,
      'reason': that.refs.reason.refs.select.value,
    };

    return data;

  }

  onChange() {
    this.checkValidity();
  }

  postSubmitDetermineState( response ) {
    let nextState = {
      loading: false,
    };

    if ( response.ok ) {
      nextState.submitted = true;
      nextState.hasErrors = false;
    } else {
      nextState.hasErrors = true;
      this.updateFormComponentsWithErrors( response.errorDetails );
    }
    this.setState( nextState );
  }

  updateFormComponentsWithErrors( errorDetails ) {

    // trickle our errors down via refs
    this.refs.name.setState({ isEmpty: errorDetails.name.isEmpty });
    this.refs.message.setState({ isEmpty: errorDetails.message.isEmpty });
    this.refs.email.setState({ isInvalid: errorDetails.email.isInvalid });
    this.refs.reason.setState({ isInvalid: errorDetails.reason.isInvalid });

  }

  onSubmit( e ) {
    e.preventDefault();

    this.setState({ loading: true });
    this.checkValidity();
    let data = this.getFormData();
    let action = this.refs.form.action;
    let method = this.refs.form.method.toUpperCase();
    let options = {
      'method': method,
      'headers': {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      'body': JSON.stringify( data ),
    };

    fetch( action, options ).then( checkStatus ).then( parseJSON ).then( this.postSubmitDetermineState ).catch(( err ) => {
      console.error( err, err.message ); // eslint-disable-line
    });

    return data;
  }

  render() {

    let errors = null;
    let formClasses = {
      'contact-form': true,
      'loading': this.state.loading,
    };

    let submitText = sendMessageBtnText;
    let loadingImage = <LoadingSpinner/>;

    if ( this.state.loading ) {
      submitText = sendingMessageBtnText;
    } else {
      loadingImage = null;
    }

    if ( this.state.hasErrors ) {
      errors = <WarningField message={formIsInvalidWarning}/>;
    } else if ( this.state.submitted ) {
      return (
        <div>
          <h3>{messageSentText}</h3>
          <p>{messageSentDetails}</p>
        </div>
      );
    }

    return (
      <form onSubmit={this.onSubmit} ref='form' action={this.props.action} method={this.props.method} className={cx( formClasses )}>
        <h3>{ContactFormTitle}</h3>
        {errors}
        <DropdownMenu ref='reason' label={reasonForContactDropdown.label} value='saying-hello'>
          <option value='saying-hello'>{reasonForContactDropdown.hello}</option>
          <option value='problem'>{reasonForContactDropdown.problem}</option>
          <option value='question'>{reasonForContactDropdown.question}</option>
          <option value='feedback'>{reasonForContactDropdown.feedback}</option>
        </DropdownMenu>

        <LabelAndInput ref='name' label={nameFieldLabel} type='text'/>
        <LabelAndInput ref='email' label={emailFieldLabel} type='email'/>
        <TextArea label={messageFieldLabel} ref='message'/>

        <button type='submit'>
          {submitText}
          {loadingImage}
        </button>
      </form>
    );
  }

}
