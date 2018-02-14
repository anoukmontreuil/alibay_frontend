import React, { Component } from 'react';
import { getPurchaseItem } from './requests';

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
            price : {this.props.price}
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