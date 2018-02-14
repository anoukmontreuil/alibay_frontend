import React, { Component } from 'react';
import './App.css';
import {
  getAllListings,
  getItemsBoughtListings,
  getItemsSoldListing,
  getCreateListings,
  getPerformSearch,
  getPurchaseItem,
  getItemDescription
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
      userLoggedIn: false,
      userRegistered: true,
      userID: "11111111"
    };
  };

  showSignUp = () => {
    this.setState(st => { return { userRegistered: false } });
  }

  showLogIn = () => {
    this.setState(st => { return { userRegistered: true } });
  }

  wasInputValidated = (inputValidationWasSuccessful) => {
    return inputValidationWasSuccessful;
  }

  getUserID = (userIDFromChild) => {
    console.log(userIDFromChild); // OK, returns 1111111
    this.setState(st => { return { loggedInUserId: userIDFromChild, userLoggedIn: true } });
    this.getPageToDisplay();
    return userIDFromChild;
  }

  getPageToDisplay = () => {

    if (this.state.userLoggedIn) {
      return (<Alibay userID={this.state.userID} />)
    };
    if (this.state.userRegistered) {
      return (
        <div>
          <Login ref={lgnfrm => this.loginForm = lgnfrm} 
                 inputValidated={this.wasInputValidated}
                 loggedInUser={this.getUserID}/> 
          <p>Not Registered? <button onClick={this.showSignUp}>Sign Up</button></p>
        </div>
      )
    } else {
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
          {this.getPageToDisplay()}
        </div>
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
    getAllListings(this.props.userID)
      .then(async listingIDs => {
        const listingItems = await Promise.all(listingIDs.map(listingID => getItemDescription(listingID)));

        console.log(listingItems)
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
  }

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
        console.log(listingSoldItems, this.props.userID)
        this.setState({ pageToDisplayInViewer: 'itemsSold', listings: listingSoldItems });
      });
  }

  setListings = (listings) => {
    this.setState({listings})
  }

  // createListing = () => {
  //   getCreateListings(this.props.userID)
  //     .then(x =>
  //       this.setState({ listings: x }));
  // }

  setAddListing = () => {
    this.setState({pageToDisplayInViewer: 'addListing'})
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
      default: this.setAllListings();
    }
    this.setState(st => { return { pageToDisplayInViewer: pageName } });
  }

  render = () => {
    console.log('app state', this.state);
    if (this.state.pageToDisplayInViewer === "addListing") {
      return <AddListing allListings={this.state.listings}
      setListings={this.setListings} />
    } else {
      return (
        <div className="FlexCenter">
          <div>
            <Sidebar pageToDisplayInViewer={this.setPageToDisplayInViewer} />
          </div>
          <div>
            <Searchbar ref={sb => this.searchField = sb} pageToDisplayInViewer={this.setPageToDisplayInViewer} />
            <Viewer ref={pdm => this.pageViewer = pdm}
              pageToDisplay={this.state.pageToDisplayInViewer}
              allListings={this.state.listings}
              setListings={this.setListings}
              itemsBought={this.state.listings}
              itemsSold={this.state.listings} />
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