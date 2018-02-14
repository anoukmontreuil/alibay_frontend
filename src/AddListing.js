import React, { Component } from 'react';
import { getCreateListings } from './requests';
import App from './App'

class AddListing extends Component {
    constructor(props) {
        super(props);
        
    }

    createListings = () => {
        getCreateListings(this.props.userID, this.itemPrice.value, this.itemBlurb.value)
            .then(response => this.props.setListings(this.props.allListings.concat(response))
            )
    }



    render = () => {
        console.log('add listing props', this.props)
        return (
            <div className="ModalBackground">
                <div className="ModalWindow">
                    <div className="ModalTitleBar">Add A Listing</div>
                    <div className="ModalBody">
                        <div className="BlockTopLeft">
                            <input ref={imgsel => this.imageSelector = imgsel} type="file" onChange={this.selectImageFile} />
                        </div>
                        <div className="BlockTopLeft">
                            <input ref={it => this.itemTitle = it} placeholder="Name of item" maxLength="140" className="NameField" />
                            <input ref={ip => this.itemPrice = ip} placeholder="Price" maxLength="10" className="PriceField" />
                        </div>
                        <div className="BlockTopLeft">
                            <textarea ref={ib => this.itemBlurb = ib} placeholder="Item description" rows="5" cols="51" maxLength="4096" />
                        </div>
                        <div>
                            <button onClick={this.createListings}>Add Listing</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddListing;