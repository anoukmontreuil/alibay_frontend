import React, { Component } from 'react';
import { getCreateListings, uploadFile } from './requests';

class AddListing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            postingValidated: false,
            pictureSelected: false,
            uploadedPicturePath: null
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
            && this.itemBlurb.value.length > 0) {
            this.setState(st => { return { postingValidated: true } });
        } else {
            this.setState(st => { return { postingValidated: false } });
        }
    }

    createListings = () => {
        // console.log(this.props.userID)
        getCreateListings(this.props.userID, this.itemPrice.value, this.itemBlurb.value, this.state.uploadedPicturePath)
            .then(response => {
                this.props.setListings(this.props.allListings.concat({ 
                    seller: this.props.userID, 
                    price: this.itemPrice.value, 
                    blurb: this.itemBlurb.value,
                    description: this.itemDescription,
                    picturePath: this.state.uploadedPicturePath
                 }))
            })
    }

    uploadImg = img => {
        uploadFile(img)
        .then(x => x.json())
        .then(y => {
            this.setState( st => { return { uploadedPicturePath: "http://localhost:4000/img/" + y } } ); 
        } );
      }

    render = () => {
        // console.log('add listing props', this.props)
        return (
            <div className="ModalBackground">
                <div className="ModalWindow">
                    <div className="ModalTitleBar FlexCenterLeft">
                        <div className="AlignLeft FullWidth">Add A Listing</div>
                        <div className="AlignRight FullWidth"><button onClick={this.props.handler}> <span className="ModalCloseButton">r</span> </button></div>
                    </div>
                    <div className="ModalBody">
                        <div className="FlexTopLeft">
                            <div className="BlockCenter">
                                <div className="SubHeader">Picture Preview</div>
                                <div>{this.state.uploadedPicturePath !== null ? <div><img className="SelectedPicturePreview" src={this.state.uploadedPicturePath} alt="Selected Picture"/></div> : <div className="PicturePlaceholder"></div> }</div>
                            </div>
                            <div>
                                <div className="BlockTopLeft">
                                    <input type="file" accept="image/*" onChange={e => this.uploadImg(e.target.files[0])} /> 
                                </div>
                                <div className="BlockTopLeft">
                                    <input ref={it => this.itemBlurb = it} onChange={this.validatePosting} placeholder="Name of item" maxLength="140" className="NameField" />
                                    <input ref={ip => this.itemPrice = ip} onChange={this.validatePosting} placeholder="Price" maxLength="10" className="PriceField" />
                                </div>
                                <div className="BlockTopLeft">
                                    <textarea ref={ib => this.itemDescription = ib} placeholder="Item description" rows="5" cols="51" maxLength="4096" />
                                </div>
                                <div>
                                    <button className="AddListingButton" onClick={this.createListings}>Add Listing</button>
                                    <button className="ModalCancelButton" onClick={this.props.handler}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddListing;