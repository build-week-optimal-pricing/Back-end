//build
const router = require('express').Router();
//db helpers
const authDb = require('../../data/routeHelpers/auth-model');
//mw
const { regHostMw } = require('../middleware/auth/reg-mw');

router.post('/', ...regHostMw, (req, res) => {

  authDb.addHost(req.body)
    .then( resou => {
      res.status(200).json({ message: `added new host`, resource: resou })
    })
});

router.delete('/:hostId', (req, res) => {
  const hostId = parseInt(req.params.hostId);
  authDb.removeHost(hostId)
    .then( resou => {
      console.log(resou, 'log of .removeHost resource resolving');
      resou
        ?
          res.status(200).json({ message: `deleted host`, resource: resou })
        :
          res.status(400).json({ error: `unsure of error origin, could not delete host`, resource: resou })
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({ error: `internal server error, could not delete host`})
    })
      
})

router.get('/', (req, res) => {
  res.status(200).json({ serverConnect: `connected` });
});

module.exports = router;