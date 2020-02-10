const router = require('express').Router();
const jwt = require('jsonwebtoken');

const loginMw = require('../middleware/auth/login-mw');

router.get('/', (req, res) => {
  res.status(200).json({ serverConnect: `connected` });
})

router.post('/', loginMw, (req, res) => {

  const payload = {
    username: req.body.username,
    id: req.body.id,
    priveleges: req.isHost ? 'host' : 'admin'
  }
  const secret = process.env.JWT_SECRET;

  const options = {
    expiresIn: 1000 * 60 * 60 //tokens last for 60 minutes
  }

  const token = jwt.sign(payload, secret, options);

  const resou = {
    username: req.body.username,
    id: req.body.id
  }
  res.status(200).json({ message: `logged in with ${req.isHost ? 'host' : 'admin'} priveleges`, token: token, resource: resou })
})

module.exports = router;