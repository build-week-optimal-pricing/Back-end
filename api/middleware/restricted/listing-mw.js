

const addListingMw = [
  listing__payloadExists,
  listing__addressPresent,
  listing__hostIdPresent
]

module.exports = {
  addListingMw
}

//sanity
function listing__payloadExists(req, res, next) {
  if(req.body) {
    next();
  } else {
    res.status(400).json({ error: `endpoint requires payload` })
  }
}

//constraints
function listing__addressPresent(req, res, next) {
  if(
      req.body.street && 
      req.body.city && 
      req.body.state && 
      req.body.zip
    ) {
      next();
    } else {
      res.status(400).json({ error: `missing required address credentials` })
    }
  
}

function listing__hostIdPresent(req, res, next) {
  if(req.body.host_id) {
    next();
  } else {
    res.status(400).json({ error: `missing required host_id` })
  }
}