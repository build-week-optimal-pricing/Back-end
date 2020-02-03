const { hostFinders, adminFinders } = require('../../../data/finders');
const bcryptjs = require('bcryptjs');

const loginMw = [
  login__bodyExists,
  login__credsExist,
  log__userRecordExists,
  log__verifyPass
]

module.exports = loginMw;

function login__bodyExists(req, res, next) {
  console.log('login__bodyExists');
  req.body
    ?
      next()
    :
      res.status(400).json({ error: `payload body missing` })

}

function login__credsExist(req, res, next) {
  console.log('login__credsExist');
  req.body.username && req.body.password
    ?
      next()
    :
      res.status(400).json({ error: `admin credentials missing`})
}

async function log__userRecordExists(req, res, next) {
  console.log('log__userRecordExists');
  const hostUser = await hostFinders.findHostByUsername(req.body.username);
  const adminUser = await adminFinders.findAdminByUsername(req.body.username);
  
  !hostUser && !adminUser
    ?
      res.status(401).json({ message: `user does not exist` })
    :
      (() => {
        if(hostUser) {
          req.isHost = true;
          req.isAdmin = false;
          next();
        } else {
          req.isAdmin = true;
          req.isHost = false;
          next();
        }
      })();
}

function log__verifyPass(req, res, next) {
  console.log('log__verifyPass');
  req.isHost
    ?
      hostFinders.findHostByUsername(req.body.username)
        .then( host => {
          if(bcryptjs.compareSync(req.body.password, host.password)) {
            req.body.id = host.id;
            next();
          } else {
            res.status(401).json({ error: `invalid host password`})
          }
        })
    :
      adminFinders.findAdminByUsername(req.body.username)
        .then( admin => {
          if(bcryptjs.compareSync(req.body.password, admin.password)) {
            req.body.id = admin.id;
            next();
          } else {
            res.status(401).json({ error: `invalid admin password` });
          }
        })

}