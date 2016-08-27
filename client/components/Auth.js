import React from 'react';
import ReactDOM from "react-dom";
import firebase from './firebase';

// styling
import classnames from 'classnames/bind';
import s from './styles/Auth.styl';
const cx = classnames.bind(s);

// 
// 
// 
class AuthRegion extends React.Component {
  constructor(){
    super();
    
    // bindings
    this.update = this.update.bind(this);
    this.signOut = this.signOut.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);

    this.state = {
      mode: "login",
      signedIn: !!firebase.auth().currentUser
    };
  }
  
  componentWillMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({signedIn: true});
      } else {
        // No user is signed in.
      }
    });
  }
  
  update(e){
    let mode = e.target.innerText.toLowerCase();
    if (mode === "create account") mode = "signup";
    this.setState({mode});
  }
  
  signOut() {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      this.setState({signedIn: false, mode:"login"});
    }, function(error) {
      // An error happened.
      console.log(error);
    });
  }
  
  render() {
    
    if (this.state.signedIn) {
      
      let user = firebase.auth().currentUser;
      let name = user.displayName || user.email;
      
      return (
        <div className={cx("auth-region")}>
          <span className="user">{name}</span> &#8285; <a href="#" onClick={this.signOut}>Sign Out</a>
        </div>
      )
    }
    
    let activeRegion;
    if (this.state.mode === "login") activeRegion = <Login />
    if (this.state.mode === "signup") activeRegion = <Signup />
    
    return (
      <div className={cx("auth-region")}>
      
        <div className="row">
          <a href="#" onClick={this.update}>Login</a> &#8285; <a href="#" onClick={this.update}>Create Account</a>
        </div>
        
        <div className="row">
          {activeRegion}
        </div>
        
      </div>
    )
  }
}


// 
// 
class Login extends React.Component {
  constructor() {
    super();
    this.login = this.login.bind(this);
  }
  
  login() {
    
    let email = ReactDOM.findDOMNode(this.refs.email).value;
    let password = ReactDOM.findDOMNode(this.refs.password).value;
    
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      console.log(error)
      // ...
    });
  }
  
  render(){
    return (
      <div className="login">
        <h5>Login</h5>
        <p>Enter your email and password to log into your account.</p>
        <label className="row">Email</label>
        <input className="row" type="text" ref="email"/>
        
        <label className="row">Password</label>
        <input className="row" type="password" ref="password"/>
        <div  className="row">
          <button onClick={this.login}>Login</button>
        </div>
      </div>
    )
  }
}

class Signup extends React.Component {
  constructor() {
    super();
    this.signup = this.signup.bind(this);
    // this.update = this.update.bind(this);
  }
  
  signup(e) {
    let email = ReactDOM.findDOMNode(this.refs.email).value;
    let password = ReactDOM.findDOMNode(this.refs.password).value;
    firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
        // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error);
    });
  }
  
  render(){
    return (
      <div className="signup">
        <h5>Create an Account</h5>
        <p>Enter the email and password you would like to create your account with.</p>
        <label className="row">Email</label>
        <input className="row" type="text" ref="email" />
        
        <label className="row">Password</label>
        <input className="row" type="password" ref="password" />
        <div  className="row">
          <button onClick={this.signup}>Create Account</button>
        </div>
      </div>
    )
  }
}


export {AuthRegion, Login, Signup};