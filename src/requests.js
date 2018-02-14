export function getAllListings() {
  return fetch('/allListings')
    .then(x => x.json());
}

export function signUp(username, password) {
  // NOTE: Password was hashed in the front-end prior to being passed as a parameter to this function.
  const bodyContents = JSON.stringify({ 'username': username, 'password': password });
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
  const bodyContents = JSON.stringify({ 'username': username, 'password': password });
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

export function getItemsBoughtListings(uid) {
  return fetch('/allItemsBought?uid=' + uid)
    .then(x => x.json());
};

export function getItemsSoldListing(uid) {
  return fetch('/allItemsSold?uid=' + uid)
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

export function getCreateListings(sellerID, price, blurb) {
  return fetch('/createListing', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      sellerID: sellerID,
      price: price,
      blurb: blurb 
     })
  })
    .then(x => x.json())
};

export function getPerformSearch() {
  return fetch('/searchForListings')
    .then(x => x.json());
}

export function getPurchaseItem(buyerID, sellerID, listingID) {
  return fetch('/buy', {
    method: "POST",
    body: {
      buyerID: buyerID,
      sellerID: sellerID,
      listingID: listingID
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
    body: JSON.stringify({ listingID })
  })
    .then(x => x.json())
};