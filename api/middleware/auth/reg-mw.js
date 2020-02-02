const authDb = require('../../../data/routeHelpers/auth-model');
const bcryptjs = require('bcryptjs');

const regHostMw = [
  reg__bodyExists,
  reg__credsExist,
  reg__usernameUniqueToHost,
  reg__hash
]

module.exports = {
  regHostMw
}

function reg__bodyExists(req, res, next) {
  if(req.body) {
    next();
  } else {
    res.status(400).json({ error: `payload body missing` });
  }
}

function reg__credsExist(req, res, next) {
  if(req.body.username && req.body.password) {
    next();
  } else {
    res.status(400).json({ error: `payload missing username & password` })
  }
}

async function reg__usernameUniqueToHost(req, res, next) {
  const user = await authDb.findHostByUsername(req.body.username);

  if (user) {
    res.status(401).json({ message: `user already exists` });
  } else {
    next();
  }

}

//might not work, might need to hash within route logic
function reg__hash(req, res, next) {
  req.body.password = bcryptjs.hashSync(req.body.password, 5);
  next();
}