import React, { Component } from 'react';
import { login } from './requests';

const sha1 = require('sha1');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { userID: undefined };
  }

  confirmCredentialsValidOnServer = (authorizedUserID) => {
    return this.props.loggedInUser(authorizedUserID);
  }

  clearNotificationArea = () => {
    this.notificationArea.innerHTML = ``;
  }

  validateInputs = () => {
    // Validation Constants...
    const MIN_USERNAME_LENGTH = 1;
    const MAX_USERNAME_LENGTH = 16;
    const MIN_PASSWORD_LENGTH = 1;
    const MAX_PASSWORD_LENGTH = 16;

    // Clear the notification area, just in case an error occured earlier.
    this.clearNotificationArea();

    // Assigning evaluation results to variables...
    let usernameLengthAdequate = (this.usernameField.value.length >= MIN_USERNAME_LENGTH
      && this.usernameField.value.length <= MAX_USERNAME_LENGTH);
    let passwordLengthAdequate = (this.passwordField.value.length >= MIN_PASSWORD_LENGTH
      && this.passwordField.value.length <= MAX_PASSWORD_LENGTH);

    // Input evaluation process...
    let inputIsValid = true;

    if (!usernameLengthAdequate || !passwordLengthAdequate) {
      inputIsValid = false;
      this.notificationArea.innerHTML = `<h3 class="ErrorHeader">Error</h3>`
    }
    if (!usernameLengthAdequate) {
      this.notificationArea.innerHTML += `
      <p class="ErrorMessage">
        Username must have between ${MIN_USERNAME_LENGTH} and ${MAX_USERNAME_LENGTH} characters.
      </p>`
    }
    if (!passwordLengthAdequate) {
      this.notificationArea.innerHTML += `
      <p class="ErrorMessage">
        Password must have between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH} characters.
      </p>`
    }

    if (inputIsValid) {
      this.setState(st => { return { inputsValid: true }});
      this.notificationArea.innerHTML += `
      <h3 class="ValidationHeader">
        ...Validating Credentials, Please Wait...
      </h3>`;
      login(this.usernameField.value, sha1(this.passwordField.value))
      .then(y => { 
        this.setState( st => { return { userID: y }});
        this.props.loggedInUser(y);
        if (y === "\"Login Failed\"" || y === "\"fail\"") {
          this.clearNotificationArea();
          this.notificationArea.innerHTML = `
          <h3 class="ErrorHeader">Error</h3>
          <p class="ErrorMessage">
            Invalid Username/Password.
          </p>`
        }
      });
    }
  }
  
  render = () => {
    
    return (
      <div>
        <h2>Log In</h2>
        <input ref={unf => this.usernameField = unf} placeholder="Username" type="text" />
        <input ref={pwf => this.passwordField = pwf} placeholder="Password" type="password" />
        <button onClick={this.validateInputs}>Log In</button>
        <div ref={ntf => this.notificationArea = ntf}></div>
      </div>
    );
  }
}

export default Login;