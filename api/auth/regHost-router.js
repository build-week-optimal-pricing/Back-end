//build
const router = require('express').Router();
//db helpers
const { hostControls } = require('../../data/routeHelpers/auth-model');
const { hostFinders } = require('../../data/finders');
//mw
const { regMw } = require('../middleware/auth/');
const { regHostMw } = regMw;

router.get('/', (req, res) => {
  hostFinders.findHosts()
    .then( resou => {
      res.status(200).json({ message: `fetched hosts`, resource: resou })
    })
});

router.post('/', ...regHostMw, (req, res) => {
  hostControls.addHost(req.body)
    .then( resou => {
      res.status(201).json({ message: `added new host`, resource: resou[0] })
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({ message: `internal status error, could not register host` })
    })
});

router.delete('/:hostId', (req, res) => {
  const hostId = req.params.hostId;
  hostControls.removeHost(hostId)
    .then( resou => {
      console.log(resou, 'log of .removeHost resource resolving');
      resou
        ?
          res.status(200).json({ message: `deleted host`, resource: resou })
        :
          res.status(400).json({ error: `host does not exist`, resource: resou })
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({ error: `internal server error, could not delete host`})
    })
      
})

module.exports = router;