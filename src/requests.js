export function getAllListings() {
    return fetch('/allListings')
    .then(x => x.json());
}

export function signUp(username, password) {
  // NOTE: Password was hashed in the front-end prior to being passed as a parameter to this function.
  const bodyContents = JSON.stringify({'username': username, 'hashedPassword': password});
  console.log("The following object will be sent in the body of the POST request: " + bodyContents);
  return fetch('http://localhost:4000/signUp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: bodyContents
  }
   /*+ userID*/)
  .then(x => x.text())
  .then(y => console.log(y));
};

export function login(username, password) {
  // NOTE: Password was hashed in the front-end prior to being passed as a parameter to this function.
  const bodyContents = JSON.stringify({'username': username, 'hashedPassword': password});
  console.log("The following object will be sent in the body of the POST request: " + bodyContents);
  return fetch('http://localhost:4000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: bodyContents
  }
   /*+ userID*/)
  .then(x => x.text())
  .then(y => console.log(y));
};

export function getItemsBoughtListings(userID) {
<<<<<<< HEAD
    return fetch('/allItemsBought' + userID)
=======
    return fetch('/allItemsBought?uid=m' /*+ this.userID*/)
>>>>>>> d670d0caebe553a557990911df65ce8463996dcf
      .then(x => x.json());
};

export function getItemsSoldListing(userID) {
    return fetch('/allItemsSold' + userID)
      .then(x => x.json());
};

// export function getCreateListings() {
//     return fetch('/createListing', {
//         method: "POST",
//         body: {
//           sellerID: this.userID,
//           price: this.price,
//           blurb: this.blurb
//         }
//       })
//         .then(x => x.json());
// };

export function getCreateListings() {
  return fetch('/createListing')
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

export function getItemDescription(listingID) {
  return fetch('/getItemDescription', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({listingID})
  })
    .then(x => x.json())
};