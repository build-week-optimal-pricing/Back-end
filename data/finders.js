const db = require('./dbConfig');

const hosts = {
  //admins

  //hosts
  findHosts,
  findHostById, //findHostById(id)
  findHostByUsername, //findHostByUsername(username)
  //listings

}

module.exports = {
  hosts,
  
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