import React, { Component } from 'react';
import { getPurchaseItem } from './requests';

class ItemCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemHasBeenPurchased: false,
    }
  }

  purchaseItem = () => {
    getPurchaseItem(this.props.userID, this.props.listingID);
    this.setState({ itemHasBeenPurchased: true });
  }




  render = () => {
    console.log(this.props.userID, this.props.listingID, this.props.seller, this.props.appState)
    if (this.props.appState !== "itemsBought") {
      return (
        <div className="FlexTopLeft">
          <div className="CardBody">
            <div className="CardPrice">
              
            </div>
            <div className="FlexCenterLeft">
              {this.state.itemHasBeenPurchased || this.props.userID === this.props.seller ?
                null :
                <button className="CardButton" onClick={this.purchaseItem}>Buy</button>
              }
              {this.state.itemHasBeenPurchased ? "Purchased For: " + this.props.price : "Price: " + this.props.price}
            </div>
          </div>
          <div className="CardDescription">
            seller: {this.props.seller}

            blurb: {this.props.blurb}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non ullamcorper lacus. Aliquam augue elit, dictum ac magna nec, blandit hendrerit felis. Ut pretium, sapien nec venenatis cursus, urna eros.</div>
        </div>
      );
    } else {
      return (
        <div className="FlexTopLeft">
          <div className="CardBody">
            <div className="CardPrice">
              
            </div>
            <div className="FlexCenterLeft">
              
            </div>
          </div>
          <div className="CardDescription">
            seller: {this.props.seller}
            blurb: {this.props.blurb}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non ullamcorper lacus. Aliquam augue elit, dictum ac magna nec, blandit hendrerit felis. Ut pretium, sapien nec venenatis cursus, urna eros.</div>
        </div>
      );
    }
  }
}

export default ItemCard;