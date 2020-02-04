//build
const router = require('express').Router();
//db
const { listingFinders } = require('../../data/finders');
const listingDb = require('../../data/routeHelpers/listing-model');
//mw
const { listingMw } = require('../middleware/restricted');
//axios
const axios = require('axios');

// fetch all listings. setup admin perms
router.get('/', (req, res) => {
  listingFinders.findListings()
    .then( resou => {
      res.status(200).json({ message: `fetched listings`, resource: resou });
    })
    .catch( err => {
      res.status(500).json({ error: `internal server error, could not fetch listings` })
    })
})

// fetch listing by hostId. setup host && admin perms
// returns an array
router.get('/:hostId', (req, res) => {
  const hostId = req.params.hostId;
  listingFinders.findListingsByHostId(hostId)
    .then( resou => {
      res.status(200).json({ message: `fetched listing by host id`, resource: resou })
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({ error: `internal server error, could not fetch host listings` })
    })
})

router.post('/', ...listingMw.addListingMw, (req, res) => {
  listingDb.addListing(req.body)
    .then( resou => {
      // upon succesful add, get information about host with the id of host_id fkey in listing
      // build a separate object to send to DS api by using a function that takes 2 objects and generates a 3rd
      // axios call, then response
      res.status(200).json({ message: `added a new listing`, resource: resou })
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({ error: `could not add listing` })
    })
})

// edit a listing by id and payload
router.put('/:listingId', (req, res) => {
  const listingId = req.params.listingId;
  listingDb.editListing(req.body, listingId)  
    .then( resou => {
      res.status(200).json({ message: `successfully editted listing`, resource: resou[0] })
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({ error: `internal status error, could not edit listing` })
    })
});

// remove a listing by id
router.delete('/:listingId', (req, res) => {
  const listingId = req.params.id;
  listingDb.removeListing(listingId)
    .then( resou => {
      res.status(200).json({ message: `removed listing`, resource: resou })
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({ error: `internal server error, could not remove listing` })
    })
});

module.exports = router;