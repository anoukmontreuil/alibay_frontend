export function getAllListings(uid) {
  return fetch('/allListings?uid=' + uid)
    .then(x => x.json());
}

export function signUp(username, password) {
  // NOTE: Password was hashed in the front-end prior to being passed as a parameter to this function.
  const bodyContents = JSON.stringify({ 'username': username, 'password': password });
  // console.log("The following object will be sent in the body of the POST request: " + bodyContents);
  return fetch('http://localhost:4000/signUp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: bodyContents
  }
   /*+ userID*/)
    .then(x => x.text())
};

export function login(username, password) {
  // NOTE: Password was hashed in the front-end prior to being passed as a parameter to this function.
  const bodyContents = JSON.stringify({ 'username': username, 'password': password });
  // console.log("The following object will be sent in the body of the POST request: " + bodyContents);
  return fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: bodyContents
  }
   /*+ userID*/)
    .then(x => x.json())
    // .then(x => { console.log(x); return x })
};

export function logOff() {
  return fetch('/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  }).then(x => x.json())
  .then(y => console.log("Logging Out... ", y));
}

export function getItemsBoughtListings(uid) {
  // console.log('getItemsBoughtListings', uid)
  return fetch('/allItemsBought?uid=' + uid)
    .then(x => x.json());
};

export function getItemsSoldListing(uid) {
  return fetch('/allItemsSold?uid=' + uid)
    .then(x => x.json());
};

export function getCreateListings(sellerID, price, blurb, picturePath) {
  return fetch('/createListing', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      sellerID: sellerID,
      price: price,
      blurb: blurb,
      picturePath: picturePath
    })
  })
    .then(x => x.json())
};

export function getPerformSearch(searchTerm) {
  return fetch('/searchForListings', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      searchTerm: searchTerm
    })
  })
    .then(x => x.json());
};

export function getPurchaseItem(buyerID, listingID) {
  return fetch('/buy', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      buyerID: buyerID,
      listingID: listingID
    })
  })
    .then(x => x.json())
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
    .then(x => ({ ...x, listingID }))
};

export function checkForExistingSession() {
  return fetch('/check', {
    credentials: "same-origin"
  })
    .then(x => x.json())
}

export function uploadFile(file) {
  console.log("From requests.js:", file);
  const filename = file.name;
  const fileExtension = filename.split('.').pop(); // Splits on all dots, but returns (pop) the extension (last piece)
  return fetch('/uploadedPictures?ext=' + fileExtension, {
      method: "POST",
      body: file
  })
}

export function getUsername(uid) {
  return fetch('/getUsername?uid=' + uid)
    .then(x => x.json())
}

export function getRemovedItem(uid) {
  return fetch('/removedItems?uid=' + uid)
  .then(x => x.json());
}