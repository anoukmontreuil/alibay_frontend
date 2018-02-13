import React, { Component } from 'react';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {}
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