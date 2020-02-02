const db = require('../dbConfig');
const { hostFinders } = require('../finders');

module.exports = {

  addHost, //addHost(host)
  removeHost, //removeHost(hostId)

}

function addHost(host) {
  return db('hosts').insert(host).returning(['id', 'username']);
}
function removeHost(hostId) {
  return db('hosts').where({ id: hostId }).del();
}