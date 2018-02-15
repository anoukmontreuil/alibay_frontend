import React, { Component } from 'react';
import ItemCard from './ItemCard';
import AddListing from './AddListing'

class Viewer extends Component {
  constructor(props) {
    super(props);
  };

  getPageToDisplay = () => {
    const nameOfPageToDisplay = this.props.pageToDisplay
    if (nameOfPageToDisplay === "allListings") {
      var allListingsMap = this.props.allListings.map((listing, idx) =>
        <div key={idx}>
          <ItemCard price={listing.price}
            listingID={listing.listingID}
            seller={listing.seller}
            blurb={listing.blurb}
            buyer={listing.buyer} />
        </div>
      );
      return (
        <div>
          {allListingsMap}
        </div>
      );
    };
    if (nameOfPageToDisplay === "itemsBought") {
      var itemsBoughtMap = this.props.itemsBought.map((listing, idx) =>
        <div key={idx}>
          <ItemCard price={listing.price}
            listingID={listing.listingID}
            seller={listing.seller}
            blurb={listing.blurb}
            buyer={listing.buyer} />
        </div>
      );
      return (
        <div>
          {itemsBoughtMap}
        </div>
      );
    };
    if (nameOfPageToDisplay === "itemsSold") {
      var itemsSoldMap = this.props.itemsSold.map((listing, idx) =>
        <div key={idx}>
          <ItemCard price={listing.price}
            listingID={listing.listingID}
            seller={listing.seller}
            blurb={listing.blurb}
            buyer={listing.buyer} />
        </div>
      );
      return (
        <div>
          {itemsSoldMap}
        </div>
      );
      // if (nameOfPageToDisplay === "addListing") {
      //   console.log('viewer props', this.props)
      //   return (
      //     <div>
      //       <AddListing
      //         test="hey"
      //         allListings={this.props.allListings}
      //         setListings={this.props.setListings}  />
      //     </div>)
      // };
    };
  };

  render = () => {
    // console.log(this.props)
    return (
      <div className="Display">
        {this.getPageToDisplay()}
      </div>
    );
  }
}

export default Viewer;