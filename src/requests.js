export function getAllListings(userID) {
    return fetch('/allListings?uid=m' /*+ userID*/)
    .then(x => x.json())
}