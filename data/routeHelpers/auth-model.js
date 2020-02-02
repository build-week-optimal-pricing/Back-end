const db = require('../dbConfig');
// const { hostFinders } = require('../finders');

const hostControls = {
  addHost, //addHost(host)
  removeHost, //removeHost(hostId)
}

const adminControls = {
  addAdmin, //addAdmin(admin)
  removeAdmin, //removeAdmin(adminId)
}

module.exports = {

  hostControls,
  adminControls

}

function addHost(host) {
  return db('hosts').insert(host).returning(['id', 'username']);
}
function removeHost(hostId) {
  return db('hosts').where({ id: hostId }).del();
}

//one can remove an admin by id, however id information will not be made available
function addAdmin(admin) {
  return db('admins').insert(admin).returning('username');
}
function removeAdmin(adminId) {
  return db('admins').where({ id: adminId }).del();
}