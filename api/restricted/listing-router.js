//build
const router = require('express').Router();
//db
const { listingFinders, hostFinders, buildDSObject } = require('../../data/finders');
const listingDb = require('../../data/routeHelpers/listing-model');
//mw
const { listingMw } = require('../middleware/restricted');
//axios
const axios = require('axios');

router.get('/', (req, res) => {
  listingFinders.findListings()
    .then( resou => {
      res.status(200).json({ message: `fetched listings`, resource: resou });
    })
    .catch( err => {
      res.status(500).json({ error: `internal server error, could not fetch listings` })
    })
})

router.get('/:hostId', (req, res) => {
  listingFinders.findListingsByHostId(req.params.hostId)
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
//2.4.20 - 1:15pm - pg .returning() does not allow .first() clause
      listingFinders.countListingsByHostId(listing[0].host_id)
        .then( ({ count }) => {
          // plug count back into listings_count
          hostFinders.findHostById(listing[0].host_id)
          .then( host => {
            host.listings_count = parseInt(count);
            getPriceEst(listing, generatePayload(listing[0], host), res);
          })
          .catch( err => {
            console.log(err);
            res.status(500).json({ message: `internal server error` })
          })

        })
        .catch( err => {
          res.status(500).json({ message: `internal server error, could not get listings_count` })
        })//count catch
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({ error: `could not add listing` })
    })//add listing catch
})

router.put('/:listingId', (req, res) => {
  listingDb.editListing(req.body, req.params.listingId)  
    .then( listing => {

      listingFinders.countListingsByHostId(listing[0].host_id)
        .then( ({ count }) => { 
          host.listings_count = parseInt(count);
          hostFinders.findHostById(listing[0].host_id)
          .then( host => {
            getPriceEst(listing, generatePayload(listing[0], host), res);
          })
          .catch( err => {
            console.log(err);
            res.status(500).json({ message: `internal server error, could not resolve editting host` })
          })

        })
        .catch( err => {
          console.log(err);
          res.status(500).json({ message: `internal server error, could not get listings_count` })
        }) // count listings catch


    })
    .catch( err => {
      console.log(err);
      res.status(500).json({ error: `internal status error, could not edit listing` })
    }) // listings edit catch
});

router.delete('/:listingId', (req, res) => {
  listingDb.removeListing(req.params.listingId)
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

function getPriceEst(listing, sendThisToDS, res) {
  console.log(sendThisToDS, 'ds object');
  axios.post('https://optimalprice.stromsy.com/estimate-price', sendThisToDS)
  .then( dsRes => {
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
}

// function recountListings()