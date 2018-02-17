import React, { Component } from 'react';
import { getPurchaseItem, getItemRemoved, getRemovedItem } from './requests';

class ItemCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemHasBeenPurchased: false,
      cardVisible: true
    }
  }

  purchaseItem = () => {
    getPurchaseItem(this.props.userID, this.props.listingID);
    this.setState({ itemHasBeenPurchased: true });
  }


  // removeItem = () => {
  //   getRemovedItem(this.props.userID);
  //   this.setState({ cardVisible: false })
  // }

/* <button onClick={this.removeItem}>Remove item</button> : */

  render = () => {
    // console.log(this.props.listing, this.props.userID, this.props.seller, this.props.appState, this.props.buyer)
    if (this.props.appState !== "itemsBought" && this.state.cardVisible === true) {
      return (
        <div className="FlexTopLeft">
          <div className="CardBody">
            <div className="CardPrice">
              <img className="CardImage" src={this.props.image} />
            </div>
            <div className="FlexCenterLeft">
              {this.state.itemHasBeenPurchased || this.props.userID === this.props.seller || this.props.appState === "itemsBought" ?
                 null :
                <button className="CardButton" onClick={this.purchaseItem}>Buy</button>}
              {this.state.itemHasBeenPurchased ? "Purchased For: " + this.props.price : "Price: " + this.props.price}
            </div>
            {/* <div>
              {this.props.userID === this.props.seller ? <button onClick={this.removeItem}>Remove item</button> : null}
            </div> */}

          </div>

          <div className="CardDescription">
            <div>
              seller: {this.props.seller}
              blurb: {this.props.blurb}
            </div>
            description : {this.props.description}
          </div>
        </div>
      );
    } else if (this.state.cardVisible === true) {
      return (
        <div className="FlexTopLeft">
          <div className="CardBody">
            <div className="CardPrice">
              <img className="CardImage" src={this.props.image} />
            </div>
            <div className="FlexCenterLeft">
              <button onClick={this.removeItem}>Remove item</button>
            </div>
          </div>

          <div className="CardDescription">
            <div>
              seller: {this.props.seller}
              blurb: {this.props.blurb}
            </div>
            description : {this.props.description}
          </div>
        </div>
      );
    }
    else {
      return null;
    }
  }
}

export default ItemCard;