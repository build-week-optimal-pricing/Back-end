//build
const router = require('express').Router();
//routes
const listingRouter = require('./listing-router');
//mw
const { restricted } = require('../middleware/restricted');

router.use('/listings', listingRouter);

//server connect
router.get('/', (req, res) => {
  res.status(200).json({ serverConnect: `connected` })
});

module.exports = router;