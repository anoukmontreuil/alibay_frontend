import React, { Component } from 'react';
import ItemCard from './ItemCard';
import AddListing from './AddListing'

class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allListings: [ {
        price: "10",
        seller: "jj",
        blurb: "cet objet",
        buyer: true,
        listingID: "12"
      }, {
        price: "10",
        seller: "jj",
        blurb: "cet objet",
        buyer: true,
        listingID: "12"
      } ]
    }
  }

  getPageToDisplay = () => {
    const nameOfPageToDisplay = this.props.pageToDisplay
    if (nameOfPageToDisplay === "allListings") {
      var allListingsMap = this.state.allListings.map((listing, idx) =>
        <div key={idx}>
        <ItemCard price={listing.price} 
        listingID={listing.listingID} 
        seller={listing.seller} 
        blurb={listing.blurb} 
        buyer={listing.buyer}/>
      </div>
    )
      return (
        <div>
          {allListingsMap}
        </div>
      )
    }
    if (nameOfPageToDisplay === "addListing") {
      return <AddListing />
    }
    if (nameOfPageToDisplay === "itemsBought") {
      return (
        <div>
          <ItemCard price={this.props.price} 
          listingID={this.props.listingID} 
          seller={this.props.seller} 
          blurb={this.props.blurb} 
          buyer={this.props.buyer} />
        </div>
      )
    }
    if (nameOfPageToDisplay === "itemsSold") {
      return (
        <div>
          <ItemCard price={this.props.price} 
          listingID={this.props.listingID} 
          seller={this.props.seller} 
          blurb={this.props.blurb} 
          buyer={this.props.buyer} />
        </div>
      )
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({allListings: nextProps.allListings})
  } 

  render = () => {
    console.log(this.state)
    return (
      <div className="Display">
        {this.getPageToDisplay()}
      </div>
    );
  }
}

export default Viewer;