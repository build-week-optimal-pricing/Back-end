//build
const router = require('express').Router();
//db helpers
const { hostControls } = require('../../data/routeHelpers/auth-model');
const { hostFinders } = require('../../data/finders');
//mw
const { regMw, profileMw } = require('../middleware/auth/');
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

router.put('/:hostId', ...profileMw, (req, res) => {

  const hostId = req.params.hostId;
  hostControls.editHost(req.body, hostId)
    .then( resou => {
      console.log(resou)
      res.status(200).json({ message: `host profile updated`, resource: resou[0] })
    })
    .catch( err => {
      res.status(500).json({ message: `internal server error, could not update host profile` })
    })
})

module.exports = router;