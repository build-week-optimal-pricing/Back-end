//build
const router = require('express').Router();
//db
const { listingFinders, hostFinders } = require('../../data/finders');
const listingDb = require('../../data/routeHelpers/listing-model');
//mw
const { listingMw } = require('../middleware/restricted');
//helpers
const { listingHelpers } = require('../helpers');

router.get('/:hostId', (req, res) => {
  // host_id from params.id
  listingFinders.findListingsByHostId(req.params.hostId)
    .then( resou => {
      res.status(200).json({ message: `fetched listing by host id`, resource: resou })
    })
    .catch( err => {
      console.log(err);
      // if erroneous http request gets through mw, err will be logged in string format
      res.status(500).json({ message: `internal server error, could not fetch host listings`, error: err.toString() })
    })
})

router.post('/', ...listingMw.addListingMw, (req, res) => {
  // host_id from payload

  listingDb.addListing(req.body)
    .then( listing => {
      hostFinders.findHostById(listing[0].host_id)
        .then( host => {

          listingFinders.countListingsByHostId(listing[0].host_id)
            .then( ({ count }) => {
              host = {
                ...host,
                listings_count: parseInt(count)
              }
              const sendThisToDS = listingHelpers.generatePayload(listing[0], host);
              listingHelpers.getPriceEst(listing, sendThisToDS, res);

            })
            .catch( err => {
              res.status(500).json({ message: `internal server error, could not get listings_count` })
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
    })//add listing catch
})

router.put('/:listingId', ...listingMw.putListingMw, (req, res) => {
  console.log(req.body.host_id, req.tokenHostId, 'host_ids');
  //host_id in payload
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
  // might have to join table to find host_id for comparison
  listingDb.removeListing(req.params.listingId)
    .then( resou => {
      res.status(200).json({ message: `removed listing`, resource: resou })
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({ error: `internal server error, could not remove listing` })
    })
});

router.post('/getQuote', ...listingMw.getQuoteMw, (req, res) => {
  // don't think I need mw
  const listing = req.body;
    listingFinders.countListingsByHostId(listing.host_id)
      .then( ({ count }) => {
        // plug count back into listings_count
        hostFinders.findHostById(listing.host_id)
        .then( host => {
          host.listings_count = parseInt(count);

          const sendThisToDS = listingHelpers.generatePayload(listing, host);
          listingHelpers.getPriceQuote(listing, sendThisToDS, res);

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

module.exports = router;