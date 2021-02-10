const router = require('express').Router();
const jwt = require('jsonwebtoken');

const loginMw = require('../middleware/auth/login-mw');

router.get('/', (req, res) => {
  res.status(200).json({ serverConnect: `connected` });
})

router.post('/', loginMw, (req, res) => {

  const payload = {
    username: req.body.username,
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

// write middleware that performs necessary checks before refreshing jwt
// router.post('/refreshAuth', (req, res) => {
//   let prevToken;
//   prevToken = req.headers.authorization;
//   const decoded = jwt.verify(prevToken, process.env.JWT_SECRET);
//   const payload = {
//     username: ,
//     priveleges: 
//   }
//   const secret = process.env.JWT_SECRET;

//   const options = {
//     expiresIn: 1000 * 60 * 60
//   }

//   const newToken = jwt.sign(payload, secret, options);
//   if()
//   res.status(200).json({ message: `refreshed token with ${} priveleges` })
// })

module.exports = router;