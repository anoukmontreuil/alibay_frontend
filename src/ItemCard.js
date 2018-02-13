import React, { Component } from 'react';
import {getPurchaseItem} from './requests';

class ItemCard extends Component {
  constructor() {
    super();
    this.state = {
      itemHasBeenPurchased: false,
      buyerID: null
    }
  }
  
  purchaseItem = () => {
    getPurchaseItem()
      .then(x => console.log(x));
    this.setState(st => { return { itemHasBeenPurchased: true } });
  }

 

  render = () => {
    return (
      <div className="FlexTopLeft">
        <div className="CardBody">
          <div className="CardPrice">
            {this.props.listingID === "listing1ID"
              ? <img className="CardImage" src="Boat.jpg" />
              : this.props.listingID === "listing2ID"
                ? <img className="CardImage" src="Gloves.jpg" /> : <img className="CardImage" src="Running-Shoes.jpg" />}
            <div className="FlexCenterLeft">

              {this.state.itemHasBeenPurchased ? null : <button className="CardButton" onClick={this.purchaseItem}>Buy</button>}
              {this.state.itemHasBeenPurchased ? "Purchased For: " : ""}

              {this.props.listingID === "listing1ID"
                ? "50000$"
                : this.props.listingID === "listing2ID"
                  ? "1000$" : "100$"}
            </div>
          </div>
        </div>
        <div className="CardDescription">
          <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non ullamcorper lacus. Aliquam augue elit, dictum ac magna nec, blandit hendrerit felis. Ut pretium, sapien nec venenatis cursus, urna eros.</div>
        </div>
      </div>
    );
  }
}

export default ItemCard;