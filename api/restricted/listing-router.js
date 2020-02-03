//build
const router = require('express').Router();
const { listingFinders } = require('../../data/finders');

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
      res.status(500).json({ error: `internal server error, could not fetch host listings` })
    })
})

// add a listing
router.post('/', (req, res) => {

})

// remove a listing by id
router.delete('/:listingId', (req, res) => {
  const listingId = req.params.id;
});

// edit a listing by id and payload
router.put('/:listingId', (req, res) => {
  const listingId = req.params.id;
});

module.exports = router;