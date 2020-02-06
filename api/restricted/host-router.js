//build
const router = require('express').Router();
//db
const { hostFinders } = require('../../data/finders');
const hostDb = require('../../data/routeHelpers/host-model');
//mw
const { put_profileMw, del_profileMw, get_profileMw } = require('../middleware/restricted/').hostMw;
//change jwt payload to include id of logged in host
router.get('/:hostId', ...get_profileMw, (req, res) => {
  //check if hostId is legit
  hostFinders.findHostById(req.params.hostId)
    .then( resou => {
      if(resou !== undefined) {
        res.status(200).json({ message: `fetched host`, resource: resou })
      } else {
        res.status(404).json({ message: `resource host not found` })
      }
      
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({ error: `internal server error, could not fetch host` })
    })
})

router.put('/:hostId', ...put_profileMw, (req, res) => { 
  //check if hostId is legit
  //check if 
  hostDb.editHost(req.body, req.params.hostId)
    .then( resou => {
      res.status(200).json({ message: `host successfully editted`, resource: resou[0] })
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({ message: `internal server error, could not edit host` })
    })
})

router.delete('/:hostId', ...del_profileMw, (req, res) => {
  //check if hostId is legit
  hostDb.removeHost(req.params.hostId)
    .then( resou => {
      res.status(200).json({ message: `deleted host`, resource: resou })
    })
    .catch( err => {
      res.status(500).json({ message: `internal server error, could not delete host` })
    })
})

module.exports = router;