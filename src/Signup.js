import React, { Component } from 'react';
import { signUp } from './requests';

const sha1 = require('sha1');

class SignUp extends Component {
  constructor() {
    super();
    this.state = { newUserCreated: false }
  }

  confirmNewCredentialsValidOnServer = (newUserID) => {
    return this.props.newUser(newUserID);
  }

  clearSignUpNotificationArea = () => {
    this.signUpNotificationArea.innerHTML = ``;
  }

  validateInputs = () => {
    // Validation Constants...
    const MIN_USERNAME_LENGTH = 1;
    const MAX_USERNAME_LENGTH = 16;
    const MIN_PASSWORD_LENGTH = 1;
    const MAX_PASSWORD_LENGTH = 16;

    // Clear the notification area, just in case an error occured earlier.
    this.signUpNotificationArea.innerHTML = ``

    // Assigning evaluation results to variables...
    let signUpUsernameLengthAdequate = (this.signUpUsernameField.value.length >= MIN_USERNAME_LENGTH
      && this.signUpUsernameField.value.length <= MAX_USERNAME_LENGTH);
    let signUpPasswordLengthAdequate = (this.signUpPasswordField.value.length >= MIN_PASSWORD_LENGTH
      && this.signUpPasswordField.value.length <= MAX_PASSWORD_LENGTH);

    // Input evaluation process...
    let inputIsValid = true;

    if (!signUpUsernameLengthAdequate || !signUpPasswordLengthAdequate || this.signUpPasswordField.value !== this.signUpPasswordConfirmationField.value) {
      inputIsValid = false;
      this.signUpNotificationArea.innerHTML = `<h3 class="ErrorHeader">Error</h3>`
    }
    if (!signUpUsernameLengthAdequate) {
      this.signUpNotificationArea.innerHTML += `
      <p class="ErrorMessage">
        Username must have between ${MIN_USERNAME_LENGTH} and ${MAX_USERNAME_LENGTH} characters.
      </p>`
    }
    if (!signUpPasswordLengthAdequate) {
      this.signUpNotificationArea.innerHTML += `
      <p class="ErrorMessage">
        Password must have between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH} characters.
      </p>`
    }
    if (this.signUpPasswordField.value !== this.signUpPasswordConfirmationField.value) {
      this.signUpNotificationArea.innerHTML += `
      <p class="ErrorMessage">
        Password and password confirmation do not match.
      </p>`
    }
    if (inputIsValid) {
      this.props.inputValidated(true);
      this.signUpNotificationArea.innerHTML += `
      <h3 class="ValidationHeader">
        ...Validating Credentials, Please Wait...
      </h3>`
      signUp(this.signUpUsernameField.value, sha1(this.signUpPasswordField.value))
      .then(y => {
        this.clearSignUpNotificationArea();
        if (y === "\"success\"") {
          this.signUpNotificationArea.innerHTML = `<h3 class="SuccessHeader">Success</h3>
          <p class="SuccessMessage">
          Registration Successful!
          </p>
          `
        } else {
          this.signUpNotificationArea.innerHTML = `<h3 class="ErrorHeader">Error</h3>`
          if (y === "\"Username not available\"" ) {
            this.signUpNotificationArea.innerHTML += `
            <p class="ErrorMessage">
            Username is already in use. Please select a different username.
            </p>
            `
          }
          if (y === "\"Signup Failed\"" )
          this.signUpNotificationArea.innerHTML += `
          <p class="ErrorMessage">
          Registration Failed. Please try again.
          </p>
          `
        }
      });
    }
  }
  
  render = () => {
    return (
      <div>
        <h2>Sign Up</h2>
        <input ref={suunf => this.signUpUsernameField = suunf} placeholder="Username" type="text" />
        <input ref={supwf => this.signUpPasswordField = supwf} placeholder="Password" type="password" />
        <input ref={supwcf => this.signUpPasswordConfirmationField = supwcf} placeholder="Confirm Password" type="password" />
        <button onClick={this.validateInputs}>Sign Up</button>
        <div ref={suntf => this.signUpNotificationArea = suntf}></div>
      </div>
    );
  }
}

export default SignUp;