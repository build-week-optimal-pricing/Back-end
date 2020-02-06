const { hostFinders } = require('../../../data/finders');

const put_profileMw = [
  payloadExists,
  hostExists
]

const del_profileMw = [
  hostExists
]

const get_profileMw = [
  hostExists
]

module.exports = {
  put_profileMw,
  del_profileMw,
  get_profileMw
}

function payloadExists(req, res, next) {
  Object.keys(req.body).length
    ?
      next()
    :
      res.status(400).json({ error: `payload not found` })

}
function hostExists(req, res, next) {
  hostFinders.findHostById(req.params.hostId)
    .then( host => {
      if(host) {
        next();
      } else {
        res.status(404).json({ error: `host resource not found` })
      }
    })
    .catch( err => {
      console.log('error within hostExists mw', err);
      res.status(500).json({ error: `internal server error, could not verify host` })
    })
}

