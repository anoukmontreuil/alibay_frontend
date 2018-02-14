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
    body: bodyContents
  }
   /*+ userID*/)
  .then(x => x.text())
  .then(y => console.log(y));
};

export function logIn(username, password) {
  // NOTE: Password was hashed in the front-end prior to being passed as a parameter to this function.
  const bodyContents = JSON.stringify({'username': username, 'hashedPassword': password});
  console.log("The following object will be sent in the body of the POST request: " + bodyContents);
  return fetch('http://localhost:4000/logIn', {
    method: 'POST',
    body: bodyContents
  }
   /*+ userID*/)
  .then(x => x.text())
  .then(y => console.log(y));
};

<<<<<<< HEAD

export function getItemsBoughtListings() {
    return fetch('/allItemsBought')
=======
export function getItemsBoughtListings(userID) {
    return fetch('/allItemsBought?uid=m' /*+ this.userID*/)
>>>>>>> 661ee082d8cb43133a9874d2016fb07109be2342
      .then(x => x.json());
};

export function getItemsSoldListing() {
    return fetch('/allItemsSold')
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