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
    this.state = { pageToDisplayInViewer: "allListings" }
  }
  setPageToDisplayInViewer = pageName => {
    this.setState(st => { return { pageToDisplayInViewer: pageName }});
  }
  render = () => {
    return (
      <div className="FlexCenter">
        <div>
          <Sidebar pageToDisplayInViewer={this.setPageToDisplayInViewer}/>
        </div>
        <div>
          <Searchbar ref={sb => this.searchField = sb} pageToDisplayInViewer={this.setPageToDisplayInViewer}/>
          <Viewer ref={pdm => this.pageViewer = pdm} pageToDisplay={this.state.pageToDisplayInViewer}/>
        </div>
      </div>
    );
  }
}

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }
  displayAddListingPage = () => {
    this.props.pageToDisplayInViewer("addListing");
  }
  displayAllListingsPage = () => {
    this.props.pageToDisplayInViewer("allListings");
  }
  render = () => {
    return (
      <div className="Sidebar">
        <div>
          <div className="SidebarHeader">All Listings</div>
          <button onClick={this.displayAllListingsPage} className="FullWidth">View All Listings</button>
        </div>
        <div className="FlexCenter">
          <div className="SidebarSplitter"></div>
          <div className="SidebarSplitter"></div>
          <div className="SidebarSplitter"></div>
          <div className="SidebarSplitter"></div>
          <div className="SidebarSplitter"></div>
        </div>
        <div>
          <div className="SidebarHeader">Buyer Mode</div>
          <button className="FullWidth">View Items Purchased</button>
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
          <button onClick={this.displayAddListingPage} className="FullWidth">Put Item Up For&nbsp;Sale</button>
          <button className="FullWidth">View Items Sold</button>
        </div>
      </div>
    );
  }
}

class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = { }
  }
  performSearch = () => {
    if (this.searchBar.value === "") {
      this.props.pageToDisplayInViewer("allListings");
    } else {}
  }
  render = () => {
    return (
      <div className="FlexCenter">
        <input ref={sb => this.searchBar = sb} className="Searchbar" placeholder="Find items for sale"/>
        <button onClick={this.performSearch}>Search</button>
      </div>
    );
  }
}

class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = { pageToDisplay: this.props.pageToDisplay }
  }
  getPageToDisplay = () => {
    const nameOfPageToDisplay = this.props.pageToDisplay 
    if (nameOfPageToDisplay === "allListings") {
      return (
        <div>
          <ItemCard listingID="listing1ID"/>
          <ItemCard listingID="listing2ID"/>
          <ItemCard listingID="listing3ID"/>
        </div>
      )
    }
    if (nameOfPageToDisplay === "addListing") {
      return <AddListing />
    }
  }
  render = () => {
    return (
      <div className="Display">
        {this.getPageToDisplay()}
      </div>
    );
  }
}

class ItemCard extends Component {
  constructor() {
    super();
    this.state = { 
      itemHasBeenPurchased: false, 
      buyerID: null }
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
              { this.state.itemHasBeenPurchased ? "Purchased For: " : "" } 
              
              { this.props.listingID === "listing1ID" 
              ? "50000$"
              : this.props.listingID === "listing2ID"
                ? "1000$" : "100$" }
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

class AddListing extends Component {
  constructor() {
    super();
    this.state = { 
      postingValidated: false,
      pictureSelected: false
     }
  }
  selectImageFile = () => {
    const imgPath = this.imageSelector.value;
    if (
      imgPath.length > 4 
      && (
           imgPath.substring(imgPath.length - 3, imgPath.length).toUpperCase() === "JPG"
        || imgPath.substring(imgPath.length - 3, imgPath.length).toUpperCase() === "GIF"
        || imgPath.substring(imgPath.length - 3, imgPath.length).toUpperCase() === "PNG"
      )
    ) {
    this.setState(st => { return { pictureSelected: true }});
    this.itemTitle.value = imgPath.substring(12, imgPath.length - 4);
    }
  }
  validatePosting = () => {
    let priceToNumber = -1;
    if (this.itemPrice.value.length > 0) {
      priceToNumber = parseInt(this.itemPrice.value, 10);
    }
    if ( this.itemTitle.value.length > 0
      && this.itemPrice.value.length > 0
      && priceToNumber > -1
      && this.itemBlurb.value.length > 0 
    ) {
      this.setState(st => { return { postingValidated: true }});
    } else {
      this.setState(st => { return { postingValidated: false }});
    }
  }
  render = () => {
    return (
      <div className="ModalBackground">
        <div className="ModalWindow">
          <div className="ModalTitleBar">Add A Listing</div>
          <div className="ModalBody">
            <div className="BlockTopLeft">
              <input ref={imgsel => this.imageSelector = imgsel} type="file" onChange={this.selectImageFile}/>
            </div>
            <div className="BlockTopLeft">
              <input ref={it => this.itemTitle = it} onChange={this.validatePosting} placeholder="Name of item" maxLength="140" className="NameField"/>
              <input ref={ip => this.itemPrice = ip} onChange={this.validatePosting} placeholder="Price" maxLength="10" className="PriceField"/>
            </div>
            <div className="BlockTopLeft">
              <textarea ref={ib => this.itemBlurb = ib} onChange={this.validatePosting} placeholder="Item description" rows="5" cols="51" maxlength="4096"/>
            </div>
            <div>
              { this.state.postingValidated ? <button>Add Listing</button> : <button className="DisabledButton" disabled>Add Listing</button> }
            </div>
          </div>
        </div>
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