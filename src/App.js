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
      displayLogin: true,
      userID: null
    };
  };

  componentDidMount() {
    checkForExistingSession()
    .then(response => { 
      if (response !== "no cookies") {
        this.setState( st => { return { 
          userID: response, 
          displayLogin: false
        } } );

      }
    });
  }

  showSignUp = () => {
    this.setState(st => { return { 
      displayLogin: false, 
      userID: null, 
      loggedOut: true } });
  }

  showLogIn = () => {
    this.setState(st => { return { 
      displayLogin: true, 
      loggedOut: true } });
  }

  wasInputValidated = (inputValidationWasSuccessful) => {
    return inputValidationWasSuccessful;
  }

  getUserID = userIDFromChild => {
    if (userIDFromChild !== "Login Failed"
      && userIDFromChild !== "fail") {
      this.setState(st => {
        return {
          userID: userIDFromChild,
          displayLogin: false,
          loggedOut: false
        }
      });
    } else {
      this.setState(st => {
        return {
          userID: undefined,
          displayLogin: true,
          loggedOut: true
        }
      });
    }
    this.getPageToDisplay();
  }

  checkForLogOut = (logOutStatusFromSideBar) => {
    // console.log("LogOut Status From SideBar = ", logOutStatusFromSideBar);
    this.setState(st => { return { 
      userID: null,
      displayLogin: true, 
      loggedOut: logOutStatusFromSideBar
    } } );
  }

  getPageToDisplay = () => {
    // If the userID is not null, redirect them to the application.
    if (this.state.userID !== null && !this.state.loggedOut) {
      return (<Alibay ref={alb => this.alibayApp = alb} 
                      userID={this.state.userID}
                      logOut={this.checkForLogOut} />)
    } 
    // If state -> displayLogin is true: Login page is displayed.
    if (this.state.displayLogin || this.state.userID === undefined ||  this.state.userID === null) {
      return (
        <div>
          <Login ref={lgnfrm => this.loginForm = lgnfrm}
            inputValidated={this.wasInputValidated}
            loggedInUser={this.getUserID} />
          <p>Not Registered? <button onClick={this.showSignUp}>Sign Up</button></p>
        </div>
      )
    }
    // If state -> displayLogin is false: Registration page is displayed.
    if (!this.state.displayLogin && this.state.userID === null) {
      return (
        <div>
          <SignUp inputValidated={this.wasInputValidated} />
          <p>Already Registered? <button onClick={this.showLogIn}>Log In</button></p>
        </div>
      )
    }
  }

  render = () => {
    return (
      <div className="App">
        <img className="Icon" src="AlibayIcon.gif" alt="Alibay" />
        <div>
          { this.getPageToDisplay() }
        </div>
      </div>
    );
  }
}

class Alibay extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      pageToDisplayInViewer: "allListings", 
      listings: [], 
      logUserOut: false }
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

  handleLogOut = logOutPropFromSideBar => {
    this.props.logOut(true);
    this.setState(st => { return { logUserOut: true } });
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
            <Sidebar 
              pageToDisplayInViewer={this.setPageToDisplayInViewer} 
              logUserOut={this.handleLogOut}/>
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