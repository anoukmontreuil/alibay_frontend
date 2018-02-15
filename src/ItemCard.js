import React, { Component } from 'react';
import { getPurchaseItem } from './requests';

class ItemCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemHasBeenPurchased: false,
      buyerID: null
    }
  }

  purchaseItem = () => {
    getPurchaseItem(this.props.buyer, this.props.seller, this.props.listingID)
    this.setState(st => { return { itemHasBeenPurchased: true } });
  }



  render = () => {
    return (
      <div className="FlexTopLeft">
        <div className="CardBody">
          <div className="CardPrice">
            price : {this.props.price}
          </div>
          <div className="FlexCenterLeft">
          <button className="CardButton" onClick={this.purchaseItem}>Buy</button>
        </div>
        </div>
        <div className="CardDescription">
          seller: {this.props.seller}
          blurb: {this.props.blurb}
          <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non ullamcorper lacus. Aliquam augue elit, dictum ac magna nec, blandit hendrerit felis. Ut pretium, sapien nec venenatis cursus, urna eros.</div>
        </div>
      </div>
    );
  }
}

export default ItemCard;