//build
const router = require('express').Router();
//db
const { listingFinders } = require('../../data/finders');
const listingDb = require('../../data/routeHelpers/listing-model');
//mw
const { listingMw } = require('../middleware/restricted');

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

// add a listing
router.post('/', ...listingMw.addListingMw, (req, res) => {
  listingDb.addListing(req.body)
    .then( resou => {
      res.status(200).json({ message: `added a new listing`, resource: resou })
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({ error: `could not add listing` })
    })
})

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

// edit a listing by id and payload
router.put('/:listingId', (req, res) => {
  const listingId = req.params.id;
  listingDb.editListing(req.body, listingId)  
    .then( resou => {
      res.status(200).json({ message: `successfully editted listing`, resource: resou })
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({ error: `internal status error, could not edit listing` })
    })
});

module.exports = router;