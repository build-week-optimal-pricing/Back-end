//build
const router = require('express').Router();
//db
const { listingFinders, hostFinders, buildDSObject } = require('../../data/finders');
const listingDb = require('../../data/routeHelpers/listing-model');
//mw
const { listingMw } = require('../middleware/restricted');
//helpers
const { listingHelpers } = require('../helpers')
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

router.get('/justOne/:listingId', (req, res) => {
  listingFinders.findListingById(req.params.listingId)
    .then( resou => {
      console.log(resou);
      res.status(200).json({ message: `fetched listing`, resource: resou})
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({ message: `internal status error, could not fetch listing` })
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

            const sendThisToDS = listingHelpers.generatePayload(listing[0], host);
            listingHelpers.getPriceEst(listing, sendThisToDS, res);

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
          

          hostFinders.findHostById(listing[0].host_id)
          .then( host => {
            host.listings_count = parseInt(count);
            listingHelpers.getPriceEst(listing, listingHelpers.generatePayload(listing[0], host), res);

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