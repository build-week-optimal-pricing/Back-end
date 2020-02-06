const db = require('../dbConfig');

module.exports = {
  removeHost, //removeHost(hostId)
  editHost, //editHost(changes, hostId)
}

function removeHost(hostId) {
  return db('hosts').where({ id: hostId }).del();
}
function editHost(changes, hostId) {
  return db('hosts').where({ id: hostId }).update(changes).returning('*');
  // check what this returns??
}