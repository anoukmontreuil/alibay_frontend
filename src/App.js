import React, { Component } from 'react';
import './App.css';
import {
  getAllListings,
  getItemsBoughtListings,
  getItemsSoldListing,
  getCreateListings,
  getPerformSearch,
  getPurchaseItem,
<<<<<<< HEAD
  getItemDescription
} from './requests';
=======
  getItemDescription } from './requests';
>>>>>>> d670d0caebe553a557990911df65ce8463996dcf
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
      userID: 12
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
    }
    if (this.state.userRegistered) {
      return (
        <div>
          <Login inputValidated={this.wasInputValidated} />
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
  }

  setItemsBoughtListing = () => {
    getItemsBoughtListings(this.props.userID)
      .then(async listingIDs => {
        const listingBoughtItems = await Promise.all(listingIDs.map(listingID => getItemDescription(listingID)));
        console.log(listingBoughtItems)
        this.setState({ pageToDisplayInViewer: 'itemsBought', listings: listingBoughtItems });
      });
  }

  setItemsSoldListing = () => {
    getItemsSoldListing(this.props.userID)
      .then(x =>
        this.setState({ pageToDisplayInViewer: 'itemsSold', listings: x }));
  }

  createListing = () => {
    getCreateListings(this.props.userID)
      .then(x =>
        this.setState({ listings: x }));
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
      default: this.setAllListings();
    }
    this.setState(st => { return { pageToDisplayInViewer: pageName } });
  }

  render = () => {
    // console.log(this.state)
    return (
      <div className="FlexCenter">
        <div>
          <Sidebar pageToDisplayInViewer={this.setPageToDisplayInViewer} />
        </div>
        <div>
          <Searchbar ref={sb => this.searchField = sb} pageToDisplayInViewer={this.setPageToDisplayInViewer} />
          <Viewer ref={pdm => this.pageViewer = pdm} pageToDisplay={this.state.pageToDisplayInViewer} allListings={this.state.listings} />
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