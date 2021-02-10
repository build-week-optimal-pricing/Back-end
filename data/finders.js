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
  countListingsByHostId //countListingsByHostId(hostId)
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

function countListingsByHostId(hostId) {
  return db('listings').count('id as count').where({ host_id: hostId }).first();
}// make sure this returns an integer