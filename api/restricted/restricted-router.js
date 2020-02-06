//build
const router = require('express').Router();
//routes
const listingRouter = require('./listing-router');
const hostRouter = require('./host-router');

router.use('/listings', listingRouter);
router.use('/hosts', hostRouter);

//server connect
router.get('/', (req, res) => {
  res.status(200).json({ serverConnect: `connected` })
});

module.exports = router;