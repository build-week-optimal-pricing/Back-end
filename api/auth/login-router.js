const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).json({ serverConnect: `connected` });
})

router.post('/', (req, res) => {
  // I expect req.body to exist or else 400
  // I expect req.body to have {username, password} or else 400
  // I expect username to exist in hosts table or else 400
  // I expect username's password hashed to match the hash they have saved within their record or else 401
  
  // I will generate a jwt token with my env secret & username & role
})

module.exports = router;