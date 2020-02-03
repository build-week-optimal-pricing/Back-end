const db = require('../dbConfig');
const { listingFinders } = require('../finders');

module.exports = {
  addListing, //addListing(listing)
  removeListing, //removeListing(id)
  editListing, //editListing(changes, id)
}

//add listing
function addListing(listing) {
  return db('listings').insert(listing)
    .then( ids => {
      return listingFinders.findListingById(ids[0]);
    })
}
//remove listing
function removeListing(id) {
  return db('listings').where({ id }).del();

}
//edit listing
function editListing(changes, id) {
  return db('listing').where({ id }).update(changes);
}