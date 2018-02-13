import React, { Component } from 'react';
import {getPurchaseItem} from './requests';

class AddListing extends Component {
  constructor() {
    super();
    this.state = {
      postingValidated: false,
      pictureSelected: false
    }
  }
  selectImageFile = () => {
    const imgPath = this.imageSelector.value;
    if (
      imgPath.length > 4
      && (
        imgPath.substring(imgPath.length - 3, imgPath.length).toUpperCase() === "JPG"
        || imgPath.substring(imgPath.length - 3, imgPath.length).toUpperCase() === "GIF"
        || imgPath.substring(imgPath.length - 3, imgPath.length).toUpperCase() === "PNG"
      )
    ) {
      this.setState(st => { return { pictureSelected: true } });
      this.itemTitle.value = imgPath.substring(12, imgPath.length - 4);
    }
  }
  validatePosting = () => {
    let priceToNumber = -1;
    if (this.itemPrice.value.length > 0) {
      priceToNumber = parseInt(this.itemPrice.value, 10);
    }
    if (this.itemTitle.value.length > 0
      && this.itemPrice.value.length > 0
      && priceToNumber > -1
      && this.itemBlurb.value.length > 0
    ) {
      this.setState(st => { return { postingValidated: true } });
    } else {
      this.setState(st => { return { postingValidated: false } });
    }
  }

    
  purchaseItem = () => {
    getPurchaseItem()
      .then(x => console.log(x));
    this.setState(st => { return { itemHasBeenPurchased: true } });
  }

  render = () => {
    return (
      <div className="ModalBackground">
        <div className="ModalWindow">
          <div className="ModalTitleBar">Add A Listing</div>
          <div className="ModalBody">
            <div className="BlockTopLeft">
              <input ref={imgsel => this.imageSelector = imgsel} type="file" onChange={this.selectImageFile} />
            </div>
            <div className="BlockTopLeft">
              <input ref={it => this.itemTitle = it} onChange={this.validatePosting} placeholder="Name of item" maxLength="140" className="NameField" />
              <input ref={ip => this.itemPrice = ip} onChange={this.validatePosting} placeholder="Price" maxLength="10" className="PriceField" />
            </div>
            <div className="BlockTopLeft">
              <textarea ref={ib => this.itemBlurb = ib} onChange={this.validatePosting} placeholder="Item description" rows="5" cols="51" maxLength="4096" />
            </div>
            <div>
              {this.state.postingValidated ? <button>Add Listing</button> : <button className="DisabledButton" disabled>Add Listing</button>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddListing;