const { hostFinders } = require('../../../data/finders');

const profileMw = [
  payloadExists,
  hostExists
]

module.exports = profileMw;

function payloadExists(req, res, next) {
  if(req.body && req.params.hostId) {
    next();
  } else {
    res.status(400).json({ error: `payload or host id not found` })
  }

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

