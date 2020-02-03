//build
const router = require('express').Router();

//server connect
router.get('/', (req, res) => {
  res.status(200).json({ serverConnect: `connected` })
});

module.exports = router;