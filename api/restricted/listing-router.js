//build
const router = require('express').Router();
//db
const { listingFinders, hostFinders, buildDSObject } = require('../../data/finders');
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
    .then( listing => {
      const listingsHostId = listing[0].host_id;
      hostFinders.findHostById(listingsHostId)
        .then( host => {
          console.log(host, 'host');
// recap: I attempted to join hostbody by host_id grabbed from listing added when user adds listing. However, because user is not required to enter all datapoints, the join fails due to certain fields being undefined. I aim to solve this problem by doing separate finds and manually joining with a function
          const sendThisToDS = generatePayload(listing[0], host);
          console.log(sendThisToDS, 'ds object')
          axios.post('https://optimalprice.stromsy.com/estimate-price', sendThisToDS)
            .then( dsRes => {
              console.log(dsRes.data);
              const price = dsRes.data.price;
              const listingQuoted = {
                ...listing[0],
                price
              }
              res.status(200).json({ message: `consumed ds-api to return a price quote`, resource: listingQuoted })
            })
            .catch( err => {
              res.status(500).json({ message: `could not consume ds-api to return price quote` })
              console.log(err);
            })

        })
        .catch( err => {
          console.log(err);
          res.status(500).json({ message: `internal server error` })
        })
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

function generatePayload(listing, host) {
  return {
    // listing data
    neighborhood: listing.neighborhood ? listing.neighborhood : undefined,
    bedrooms: listing.bedrooms ? listing.bedrooms : undefined,
    room_type: listing.room_type ? listing.room_type : undefined,
    bathrooms: listing.bathrooms ? listing.bathrooms : undefined,
    beds: listing.beds ? listing.beds : undefined,
    availability: listing.availability ? listing.availability : undefined,
    deposit: listing.deposit ? listing.deposit : undefined,
    cleaning_fee: listing.cleaning_fee ? listing.cleaning_fee: undefined,
    min_nights: listing.min_nights ? listing.min_nights : undefined,
    // host data
    listings_count: host.listings_count ? host.listings_count : undefined,
    num_reviews: host.num_reviews ? host.num_reviews : undefined,
    last_review_time: host.last_review_time ? host.last_review_time : undefined
  }
}