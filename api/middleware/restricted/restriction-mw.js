require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = restricted;

function restricted(req, res, next) {
  if(req.headers && req.headers.authorization) {
    console.log('within restricted mw');
    const tokenValidity = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);

    tokenValidity
      ?
        next()
      :
        res.status(401).json({ error: `token provided by client was invalid` })
  } else {
    res.status(401).json({ message: `request unauthorized, direct user to login` })
  }
}