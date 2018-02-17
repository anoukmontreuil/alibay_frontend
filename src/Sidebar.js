import React, { Component } from 'react';
import { logOff } from './requests';

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  logOut = () => {
    logOff();
    this.props.logUserOut(true);
  }

  displayAddListingPage = () => {
    this.props.pageToDisplayInViewer("addListing");
  }

  displayAllListingsPage = () => {
    this.props.pageToDisplayInViewer("allListings");
  }

  displayItemsBoughtPage = () => {
    this.props.pageToDisplayInViewer("itemsBought");
  }

  displayItemsSoldPage = () => {
    this.props.pageToDisplayInViewer("itemsSold");
  }

  displayItemsToSellPage = () => {
    this.props.pageToDisplayInViewer("itemsToSell");
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
          <button onClick={this.displayItemsBoughtPage} className="FullWidth">View Items Purchased</button>
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
          <button onClick={this.displayItemsToSellPage} className="FullWidth">View Items Put Up For Sale</button>
          <button onClick={this.displayItemsSoldPage} className="FullWidth">View Items Sold</button>
        </div>
        <div className="FlexCenter">
          <div className="SidebarSplitter"></div>
          <div className="SidebarSplitter"></div>
          <div className="SidebarSplitter"></div>
          <div className="SidebarSplitter"></div>
          <div className="SidebarSplitter"></div>
        </div>
        <button className="LogOutButton FullWidth" onClick={this.logOut}>Log Out</button>
      </div>
    );
  }
}

export default Sidebar;