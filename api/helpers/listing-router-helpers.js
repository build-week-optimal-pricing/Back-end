const axios = require('axios');
const { editListing } = require('../../data/routeHelpers/listing-model');

module.exports = {
  generatePayload,
  getPriceEst
}

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
  axios.post('https://optimalprice.stromsy.com/estimate-price', sendThisToDS)
  .then( dsRes => {
    const price = dsRes.data.price;
    const listingQuoted = {
      ...listing[0],
      price
    }
    console.log(listingQuoted);
    editListing(listingQuoted, listingQuoted.id)
      .then( updatedListing => {
        res.status(200).json({ message: `consumed ds-api to return a price quote`, resource: updatedListing[0] })
      })
      .catch( err => {
        console.log(err);
        res.status(500).json({ message: `internal server error, failed to edit listing`})
      })

  })
  .catch( err => {
    console.log(err);
    res.status(500).json({ message: `could not consume ds-api to return price quote` })
  })
}