export function getAllListings() {
    return fetch('/allListings')
    .then(x => x.json());

    
export function signUp(username, password) {
  console.log("Function Parameter 1 -> Username: " + username);
  console.log("Function Parameter 2 -> Password: " + password);
  console.log("Request 'SignUp' Sent From REQUESTS.JS (front-end) to API.JS (back-end)")
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
  console.log("Function Parameter 1 -> Username: " + username);
  console.log("Function Parameter 2 -> Password: " + password);
  console.log("Request 'SignUp' Sent From REQUESTS.JS (front-end) to API.JS (back-end)")
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