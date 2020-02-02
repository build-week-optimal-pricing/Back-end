// const authDb = require('../../../data/routeHelpers/auth-model');
const { hostFinders, adminFinders } = require('../../../data/finders');
const bcryptjs = require('bcryptjs');

const regHostMw = [
  reg__bodyExists,
  reg__credsExist,
  reg__usernameUnique,
  reg__hash
]

const regAdminMw = [
  reg__bodyExists,
  reg__credsExist,
  reg__usernameUnique,
  reg__hash
]

module.exports = {
  regHostMw,
  regAdminMw
}

function reg__bodyExists(req, res, next) {
  req.body
    ?
      next()
    :
      res.status(400).json({ error: `payload body missing` })

}

function reg__credsExist(req, res, next) {
  req.body.username && req.body.password
    ?
      next()
    :
      res.status(400).json({ error: `payload missing username & password` })

}

async function reg__usernameUnique(req, res, next) {
  const hostUser = await hostFinders.findHostByUsername(req.body.username);
  const adminUser = await adminFinders.findAdminByUsername(req.body.username);

  hostUser || adminUser
    ?
      res.status(401).json({ message: `user already exists` })
    :
      next()
}

//might not work, might need to hash within route logic
function reg__hash(req, res, next) {
  req.body.password = bcryptjs.hashSync(req.body.password, 5);
  next();
}