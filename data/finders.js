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

module.exports = {
  hostFinders,
  adminFinders,
  
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