//build
const router = require('express').Router();
//routes
const listingRouter = require('./listing-router');

router.use('/listings', listingRouter);

//server connect
router.get('/', (req, res) => {
  res.status(200).json({ serverConnect: `connected` })
});

module.exports = router;