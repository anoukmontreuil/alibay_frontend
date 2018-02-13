export function getAllListings() {
    return fetch('/allListings')
    .then(x => x.json());
};

export function getItemsBoughtListings(userID) {
    return fetch('/allItemsBought?uid=m' /*+ this.userID*/)
      .then(x => x.json());
};

export function getItemsSoldListing(userID) {
    return fetch('/allItemsSold?uid=m' /*+ this.userID*/)
      .then(x => x.json());
};

export function getCreateListings() {
    return fetch('/createListing', {
        method: "POST",
        body: {
          sellerID: this.userID,
          price: this.price,
          blurb: this.blurb
        }
      })
        .then(x => x.json());
};

export function getPerformSearch() {
    return fetch('/searchForListings')
      .then(x => x.json());
}

export function getPurchaseItem() {
    return fetch('/buy', {
        method: "POST",
        body: {
          buyerID: this.buyerID,
          sellerID: this.sellerID,
          listingID: this.listingID
        }
      })
        .then(x => x.json());
}