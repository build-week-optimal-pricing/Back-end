const db = require('./dbConfig');

const adminFinders = {
  findAdmins,
  findAdminById, //findAdminById(id)
  findAdminByUsername, //findAdminByUsername(username)
}

const hostFinders = {
  findHosts,
  findHostById, //findHostById(id)
  findHostByUsername, //findHostByUsername(username)
  //listings

}

const listingFinders = {
  findListings,
  findListingById, //findListingById(id)
  findListingsByHostId, //findListingByHostId(hostId)
}

module.exports = {
  hostFinders,
  adminFinders,
  listingFinders
}

//hosts
function findHosts() {
  return db('hosts');
}
function findHostById(id) {
  return db('hosts').where({ id }).first();
}
function findHostByUsername(username) {
  return db('hosts').where({ username }).first();
}

//admins
function findAdmins() {
  return db('admins');
}
function findAdminById(id) {
  return db('admins').where({ id }).first();
}
function findAdminByUsername(username) {
  return db('admins').where({ username }).first();
}

//listings
function findListings() {
  return db('listings');
}

function findListingById(id) {
  return db('listings').where({ id }).first();
}

function findListingsByHostId(hostId) {
  return db('listings').where({ host_id: hostId });
}

//ds object
// function buildDSObject(host_id) {
//   return db('listings as l')
//     .select(
//       // 'l.neighborhood',
//       // 'l.bedrooms',
//       // 'l.room_type',
//       // 'l.bathrooms',
//       // 'l.beds',
//       // 'l.availability',
//       // 'l.deposit',
//       // 'l.cleaning_fee',
//       // 'l.min_nights',
//       // 'h.listings_count',
//       // 'h.num_reviews',
//       // 'h.last_review_time'
//       '*'
//     )
//     .join('hosts as h', 'l.host_id', 'h.id')
//     .where({ host_id: host_id })

// }