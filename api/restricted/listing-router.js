//build
const router = require('express').Router();

// fetch all listings. setup admin perms
router.get('/', (req, res) => {

})

// fetch listing by hostId. setup host && admin perms
router.get('/:hostId', (req, res) => {
  
})

// add a listing
router.post('/', (req, res) => {

})

// remove a listing by id
router.remove('/:listingId', (req, res) => {
  const listingId = req.params.id;
})

// edit a listing by id and payload
router.put('/:listingId', (req, res) => {
  const listingId = req.params.id;
})

module.exports = router;