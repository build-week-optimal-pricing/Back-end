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
    .returning('*');
}
//remove listing
function removeListing(id) {
  return db('listings').where({ id }).del();

}
//edit listing
function editListing(changes, id) {
  return db('listings').where({ id }).update(changes).returning('*');
}