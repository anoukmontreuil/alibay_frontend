import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      userLoggedIn: false
    }
  }

  wasInputValidated = (inputValidationWasSuccessful) => {
    /* TO-DO: The following line is just a temporary measure
       while we have no back-end to work from. 
       (The app currently accepts any valid credentials 
       from a front-end perspective only.)*/
    this.setState(st => { return { userLoggedIn: true }})
    return inputValidationWasSuccessful;
  }

  getPageToDisplay = () => {
    if (this.state.userLoggedIn) {
      return (<Alibay />)
    } else {
      return (<Login inputValidated={this.wasInputValidated}/>)
    }
  }
  render = () => {
    return (
      <div className="App">
        <img src="AlibayIconAnimation.gif" alt="Alibay" />
        <div>
          {this.getPageToDisplay()}
        </div>
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
        <input ref={unf => this.usernameField = unf} placeholder="Username" type="text"/>
        <input ref={pwf => this.passwordField = pwf} placeholder="Password" type="password"/>
        <button onClick={this.validateInputs}>Log In</button>
        <div ref={ntf => this.notificationArea = ntf}></div>
      </div>
    );
  }
}

class Alibay extends Component {
  constructor() {
    super();
    this.state = {}
  }
  render = () => {
    return (
      <div className="FlexCenter">
        <div>
          <Sidebar />
        </div>
        <div>
          <Searchbar ref={sb => this.searchField = sb}/>
          <Viewer ref={pdm => this.pageViewer = pdm}/>
        </div>
      </div>
    );
  }
}

class Sidebar extends Component {
  constructor() {
    super();
    this.state = {}
  }
  render = () => {
    return (
      <div className="Sidebar">
        <div>
          <div className="SidebarHeader">Buyer Mode</div>
          <button className="FullWidthButton">View Items Purchased</button>
        </div>
        <div className="FlexCenter">
          <div className="SidebarSplitter"></div>
          <div className="SidebarSplitter"></div>
          <div className="SidebarSplitter"></div>
          <div className="SidebarSplitter"></div>
          <div className="SidebarSplitter"></div>
        </div>
        <div>
        <div className="SidebarHeader">Seller Mode</div>
          <button className="FullWidthButton">Put Item Up For&nbsp;Sale</button>
          <button className="FullWidthButton">View Items Sold</button>
        </div>
      </div>
    );
  }
}

class Searchbar extends Component {
  constructor() {
    super();
    this.state = {}
  }
  render = () => {
    return (
      <div className="FlexCenter">
        <input className="Searchbar" placeholder="Find items for sale"/>
        <button>Search</button>
      </div>
    );
  }
}

class Viewer extends Component {
  constructor() {
    super();
    this.state = {}
  }
  render = () => {
    return (
      <div className="Display">
        <ItemCard listingID="listing1ID"/>
        <ItemCard listingID="listing2ID"/>
        <ItemCard listingID="listing3ID"/>
      </div>
    );
  }
}

class ItemCard extends Component {
  constructor() {
    super();
    this.state = { itemHasBeenPurchased: false, buyerID: null }
    this.blurb = "";
    this.price = 0;
    this.sellerID = "";
  }
  purchaseItem = () => {
    this.setState(st => { return { itemHasBeenPurchased: true }});
  }
  render = () => {
    return (
      <div className="FlexTopLeft">
        <div className="CardBody">
          <div className="CardPrice">
            { this.props.listingID === "listing1ID" 
              ? <img className="CardImage" src="Boat.jpg" />
              : this.props.listingID === "listing2ID"
                ? <img className="CardImage" src="Gloves.jpg" /> : <img className="CardImage" src="Running-Shoes.jpg" /> }
            <div className="FlexCenterLeft">
              { this.state.itemHasBeenPurchased ? null : <button className="CardButton" onClick={this.purchaseItem}>Buy</button>}
              { this.state.itemHasBeenPurchased ? "Purchased For: " : "Price: " } 54.99$
            </div>
          </div>
        </div>
        <div className="CardDescription">
          <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non ullamcorper lacus. Aliquam augue elit, dictum ac magna nec, blandit hendrerit felis. Ut pretium, sapien nec venenatis cursus, urna eros.</div>
        </div>
      </div>
    );
  }
}

class ItemsPurchased extends Component {
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

class ItemsSold extends Component {
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

class PutItemUpForSale extends Component {
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