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
  checkForExistingSession
} from './requests';
import Sidebar from './Sidebar';
import Searchbar from './Searchbar';
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
      userID: null,
    };
  };

  componentDidMount() {
    checkForExistingSession()
    .then(response => { 
      if (response !== "\"no cookies\"" ) {
        // 'substring' below only strips out the double quotes wrapping a valid userID.
        this.setState( st => { return { 
          userID: response.substring(1, response.length - 1), 
          displayLogin: false 
        } } );
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

  getUserID = userIDFromChild => {
    if (userIDFromChild !== "\"Login Failed\""
      && userIDFromChild !== "\"fail\"") {
      this.setState(st => {
        return {
          userID: userIDFromChild,
          displayLogin: false
        }
      });
    } else {
      this.setState(st => {
        return {
          userID: undefined,
          displayLogin: true
        }
      });
    }
    this.getPageToDisplay();
  }

  checkForLogOut = logOutPropFromSideBar => {
    this.setState(st => { return { 
      userID: null,
      displayLogin: true 
    } } );
  }

  getPageToDisplay = () => {
    // If the userID is not null, redirect them to the application.
    if (this.state.userID !== null) {
      return (<Alibay ref={alb => this.alibayApp = alb} 
                      userID={this.state.userID}
                      logOut={this.checkForLogOut} />)
    } 
    // If state -> displayLogin is true: Login page is displayed.
    if (this.state.displayLogin) {
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
    if (!this.state.displayLogin) {
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
      .then(async listingIDs => {
        const listingSoldItems = await Promise.all(listingIDs.map(listingID => getItemDescription(listingID)));
        // console.log(listingSoldItems, this.props.userID)
        this.setState({ pageToDisplayInViewer: 'itemsSold', listings: listingSoldItems });
      });
  }

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
        return this.setSearchListing();
      default: this.setAllListings();
    }
    this.setState(st => { return { pageToDisplayInViewer: pageName } });
  }

  handleLogOut = logOutPropFromSideBar => {
    this.props.logOut();
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
            <Sidebar pageToDisplayInViewer={this.setPageToDisplayInViewer} logUserOut={this.handleLogOut}/>
          </div>
          <div>
            <Searchbar ref={sb => this.searchField = sb} pageToDisplayInViewer={this.setPageToDisplayInViewer} />
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