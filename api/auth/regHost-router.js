//build
const router = require('express').Router();
//db helpers
const { hostControls } = require('../../data/routeHelpers/auth-model');
//mw
const { regHostMw } = require('../middleware/auth/reg-mw');

router.post('/', ...regHostMw, (req, res) => {

  hostControls.addHost(req.body)
    .then( resou => {
      res.status(200).json({ message: `added new host`, resource: resou })
    })
});

router.delete('/:hostId', (req, res) => {
  const hostId = parseInt(req.params.hostId);
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

router.get('/', (req, res) => {
  res.status(200).json({ serverConnect: `connected` });
});

module.exports = router;