import React, { Component } from 'react';
import ItemCard from './ItemCard';
import AddListing from './AddListing'

class Viewer extends Component {
  constructor(props) {
    super(props);
  }


  getPageToDisplay = () => {
    const nameOfPageToDisplay = this.props.pageToDisplay
    if (nameOfPageToDisplay === "allListings") {
      return (
        <div>
          <ItemCard price={this.props.price} listingID={this.listingID} />
          <ItemCard listingID={this.listingID} />
          <ItemCard listingID={this.listingID} />
        </div>
      )
    }
    if (nameOfPageToDisplay === "addListing") {
      return <AddListing />
    }
    if (nameOfPageToDisplay === "itemsBought") {
      return (
        <div>
          <ItemCard listingID="listing1ID" />
          <ItemCard listingID="listing2ID" />
          <ItemCard listingID="listing3ID" />
        </div>
      )
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

export default Viewer;