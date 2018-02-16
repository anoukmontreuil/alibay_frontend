import React, { Component } from 'react';
import './App.css';
import {
  getAllListings,
  getItemsBoughtListings,
  getItemsSoldListing,
  getCreateListings,
  getPerformSearch,
  getPurchaseItem,
  getItemDescription,
  checkForExistingSession,
  getUsername
} from './requests';
import Sidebar from './Sidebar';
import Viewer from './Viewer';
import ItemCard from './ItemCard';
import AddListing from './AddListing';
import SignUp from './Signup';
import Login from './Login';

class App extends Component {
  constructor() {
    super();
    this.state = {
      appMounted: false,
      displayLogin: true,
      userID: null
    };
  };

  componentDidMount() {
    this.setState(st => { return { appMounted: true } });
    checkForExistingSession()
      .then(response => {
        if (response !== "no cookies") {
          console.log(response)
          // 'substring' below only strips out the double quotes wrapping a valid userID.
          this.setState(st => { return { userID: response } });
        }
      });
  }

  showSignUp = () => {
    this.setState(st => { return { displayLogin: false } });
  }

  showLogIn = () => {
    this.setState(st => { return { displayLogin: true } });
  }

  wasInputValidated = (inputValidationWasSuccessful) => {
    return inputValidationWasSuccessful;
  }

  getUserID = (userIDFromChild) => {
    if (userIDFromChild !== "\"Login Failed\""
      && userIDFromChild !== "\"fail\"") {
      this.setState(st => {
        return {
          userID: userIDFromChild,
          userLoggedIn: true
        }
      });
    } else {
      this.setState(st => {
        return {
          userID: undefined,
          userLoggedIn: false
        }
      });
    }
    this.getPageToDisplay();
  }

  getPageToDisplay = () => {
    // First, check whether the user has logged in before, and if so: return the app.
    if (this.state.userID !== null) {
      return (<Alibay userID={this.state.userID} />)
    }
    // If no user has logged in before: display the login screen.
    else if (this.state.displayLogin) {
      return (
        <div>
          <Login ref={lgnfrm => this.loginForm = lgnfrm}
            inputValidated={this.wasInputValidated}
            loggedInUser={this.getUserID} />
          <p>Not Registered? <button onClick={this.showSignUp}>Sign Up</button></p>
        </div>
      )
      // If state 'displayLogin' is false: redirect the user to the registration page.
    } else {
      return (
        <div>
          <SignUp inputValidated={this.wasInputValidated} />
          <p>Already Registered? <button onClick={this.showLogIn}>Log In</button></p>
        </div>
      )
    }


    // FORMER CODE BELOW...
    /*
    if (this.state.userID !== undefined && this.state.userID !== "no cookie") {
      return (<Alibay userID={this.state.userID} />)
    }
    if (this.state.userRegistered 
      || this.state.userID !== undefined && this.state.userID === "no cookie") { // If user registered, show login page.
      return (
        <div>
          <Login ref={lgnfrm => this.loginForm = lgnfrm}
            inputValidated={this.wasInputValidated}
            loggedInUser={this.getUserID} />
          <p>Not Registered? <button onClick={this.showSignUp}>Sign Up</button></p>
        </div>
      )
    } else { // If user not registered, show signup page.
      return (
        <div>
          <SignUp inputValidated={this.wasInputValidated} />
          <p>Already Registered? <button onClick={this.showLogIn}>Log In</button></p>
        </div>
      )
    }
    */
  }

  render = () => {
    return (
      <div className="App">
        <img className="Icon" src="AlibayIcon.gif" alt="Alibay" />
        <div>
          {this.state.appMounted ? this.getPageToDisplay() : null}
        </div>
      </div>
    );
  }
}



class Alibay extends Component {
  constructor(props) {
    super(props);
    this.state = { pageToDisplayInViewer: "allListings", listings: [] }
    this.handler = this.handler.bind(this)
  }

  handler(e) {
    e.preventDefault()
    this.setState({
      pageToDisplayInViewer: "allListings"
    });
  };



  setAllListings = () => {
    getAllListings(this.props.userID)
      .then(async listingIDs => {
        const listingItems = await Promise.all(listingIDs.map(listingID => getItemDescription(listingID)));

        // console.log(listingItems)
        // var tempListing = []
        // for (var i = 0; i < this.listings.length; i++) {
        //   console.log('test1')
        //   tempListing.push({
        //     price: getItemDecsription()
        // blurb: x.listings[i].blurb,
        // buyer: x.listings[i].buyer,
        // listingID: x.listings[i]
        // })
        // })
        // console.log(tempListing)
        this.setState({ pageToDisplayInViewer: 'allListings', listings: listingItems })
      });
  };

  setItemsBoughtListing = () => {
    getItemsBoughtListings(this.props.userID)
      .then(async listingIDs => {
        const listingBoughtItems = await Promise.all(listingIDs.map(listingID => getItemDescription(listingID)));
        this.setState({ pageToDisplayInViewer: 'itemsBought', listings: listingBoughtItems });
      });
  }

  setItemsSoldListing = () => {
    getItemsSoldListing(this.props.userID)
      // .then(x => console.log(x, typeof(x)))
      .then(async listingIDs => {
        const listingSoldItems = await Promise.all(listingIDs.map(listingID => getItemDescription(listingID)));
        // console.log(listingSoldItems, this.props.userID)
        this.setState({ pageToDisplayInViewer: 'itemsSold', listings: listingSoldItems });
      });
  }

  performSearch = () => {
    getPerformSearch(this.searchBar.value)
      // .then(x => JSON.parse(x))
      // .then(x => console.log(x, typeof(x)))
      // .then(x => JSON.parse(x))
      .then(async listingIDs => {
        const listingSearchItems = await Promise.all(listingIDs.map(listingID => getItemDescription(listingID)));
        this.setState({ pageToDisplayInViewer: 'searchListing', listings: listingSearchItems });
      });
  }

  // setUsername = () => {
  //   getUsername(this.userID)
  //     .then(x => console.log(x))
  //   // this.setState({username: x})
  // }

  setListings = (listings) => {
    this.setState({ listings })
  }

  setAddListing = () => {
    this.setState({ pageToDisplayInViewer: 'addListing' })
  }



  componentDidMount() {
    this.setAllListings();
  }


  setPageToDisplayInViewer = pageName => {
    switch (pageName) {
      case 'allListings':
        return this.setAllListings();
      case 'itemsBought':
        return this.setItemsBoughtListing();
      case 'itemsSold':
        return this.setItemsSoldListing();
      case 'addListing':
        return this.setAddListing();
      case 'searchListing':
        return this.performSearch();
      default: this.setAllListings();
    }
    this.setState(st => { return { pageToDisplayInViewer: pageName } });
  }

  render = () => {
    // console.log('app state', this.state)
    if (this.state.pageToDisplayInViewer === "addListing") {
      return <AddListing allListings={this.state.listings}
        setListings={this.setListings}
        userID={this.props.userID}
        handler={this.handler} />
    } else {
      return (
        <div className="FlexCenter">
          <div>
            <Sidebar pageToDisplayInViewer={this.setPageToDisplayInViewer} />
          </div>
          <div>
            <input ref={sb => this.searchBar = sb} className="Searchbar" placeholder="Find items for sale" />
            <button onClick={this.performSearch}>Search</button>
            <Viewer ref={pdm => this.pageViewer = pdm}
              pageToDisplay={this.state.pageToDisplayInViewer}
              allListings={this.state.listings}
              setListings={this.setListings}
              itemsBought={this.state.listings}
              itemsSold={this.state.listings}
              userID={this.props.userID}
              appState={this.state.pageToDisplayInViewer} />
          </div>
        </div>
      );
    }
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