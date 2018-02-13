import React, { Component } from 'react';
import './App.css';
import { getAllListings, getItemsBoughtListings, getItemsSoldListing, getCreateListings, getPerformSearch, getPurchaseItem } from './requests';
import Sidebar from './Sidebar';
import Searchbar from './Searchbar';
import Viewer from './Viewer';
import ItemCard from './ItemCard';
import AddListing from './AddListing';

class App extends Component {
  constructor() {
    super();
    this.state = {
      userLoggedIn: false,
      userRegistered: true,
      userID: undefined
    }
  }

  showSignUp = () => {
    this.setState(st => { return { userRegistered: false } });
  }

  showLogIn = () => {
    this.setState(st => { return { userRegistered: true } });
  }

  wasInputValidated = (inputValidationWasSuccessful) => {
    /* TO-DO: The following line is just a temporary measure
       while we have no back-end to work from. 
       (The app currently accepts any valid credentials 
       from a front-end perspective only.)*/
    this.setState(st => { return { userLoggedIn: true } })
    return inputValidationWasSuccessful;
  }

  getPageToDisplay = () => {
    if (this.state.userLoggedIn) {
      return (<Alibay />)
    } else {
      return (<Login inputValidated={this.wasInputValidated} />)
    }
  }
  render = () => {
    return (
      <div className="App">
        <img className="Icon" src="AlibayIcon.gif" alt="Alibay" />
        <div>
          {this.getPageToDisplay()}
        </div>
      </div>
    );
  }
}

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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  validateInputs = () => {
    // Validation Constants...
    const MIN_USERNAME_LENGTH = 1;
    const MAX_USERNAME_LENGTH = 16;
    const MIN_PASSWORD_LENGTH = 1;
    const MAX_PASSWORD_LENGTH = 16;

    // Clear the notification area, just in case an error occured earlier.
    this.notificationArea.innerHTML = ``

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
      this.props.inputValidated(true);
      this.notificationArea.innerHTML += `
      <h3 class="ValidationHeader">
        ...Validating Credentials, Please Wait...
      </h3>`
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

class Alibay extends Component {
  constructor() {
    super();
    this.state = { pageToDisplayInViewer: "allListings", listings: [] }
  }
  setAllListings = () => {
    getAllListings()
      // .then(x => { console.log(x); return x })
      .then(x =>
        this.setState({ pageToDisplayInViewer: 'allListings', listings: x }));
  }

  setItemsBoughtListing = () => {
    getItemsBoughtListings()
      .then(x =>
        this.setState({ pageToDisplayInViewer: 'itemsBought', listings: x }));
  }

  setItemsSoldListing = () => {
    getItemsSoldListing()
      .then(x =>
        this.setState({ pageToDisplayInViewer: 'itemsSold', listings: x }));
  }

  createListing = () => {
    getCreateListings()
      .then(x =>
        this.setState({ listings: x }));
  }

  getItemDecsription = () => {
    fetch('/getItemDescription')
      .then(x => x.json())
      .then(x => console.log(x))
  }



  setPageToDisplayInViewer = pageName => {
    switch (pageName) {
      case 'allListings':
        return this.setAllListings();
      case 'itemsBought':
        return this.setItemsBoughtListing();
      case 'itemsSold':
        return this.setItemsSoldListing();
      case 'itemSold' && (this.sellerID !== undefined):
        return this.getItemDecsription();
      // default: this.setAllListings();
    }
    this.setState(st => { return { pageToDisplayInViewer: pageName } });
  }



  render = () => {
    return (
      <div className="FlexCenter">
        <div>
          <Sidebar pageToDisplayInViewer={this.setPageToDisplayInViewer} />
        </div>
        <div>
          <Searchbar ref={sb => this.searchField = sb} pageToDisplayInViewer={this.setPageToDisplayInViewer} />
          <Viewer ref={pdm => this.pageViewer = pdm} pageToDisplay={this.state.pageToDisplayInViewer} />
        </div>
      </div>
    );
  }
}







// class ItemsPurchased extends Component {
//   constructor() {
//     super();
//     this.state = {}
//   }
//   render = () => {
//     return (
//       <div>
//       </div>
//     );
//   }
// }

// class ItemsSold extends Component {
//   constructor() {
//     super();
//     this.state = {}
//   }
//   render = () => {
//     return (
//       <div>
//       </div>
//     );
//   }
// }



export default App;

/* --- START: COMPONENT CLASS TEMPLATE ----------------------------------------------------
class App extends Component {
  constructor() {
    super();
    this.state = {}
  }
  render = () => {
    return (
      <div>
      </div>
    );
  }
}
------ END: COMPONENT CLASS TEMPLATE ----------------------------------------------------- */