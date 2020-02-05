

const addListingMw = [
  listing__payloadExists,
  // listing__addressPresent,
  listing__hostIdPresent,
  cleanData
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

function listing__hostIdPresent(req, res, next) {
  if(req.body.host_id) {
    next();
  } else {
    res.status(400).json({ error: `missing required host_id` })
  }
}

function cleanData(req, res, next) {
  req.body.image = req.body.image.toString();
  req.body.street = req.body.street.toString();
  req.body.city = req.body.city.toString();
  req.body.state = req.body.state.toString();
  req.body.zip = req.body.zip.toString();
  req.body.room_type = req.body.room_type.toString();
  req.body.neighborhood = req.body.neighborhood.toString();

  req.body.bedrooms = parseInt(req.body.bedrooms);
  req.body.bathrooms = parseInt(req.body.bathrooms);
  req.body.beds = parseInt(req.body.beds);
  req.body.availability = parseInt(req.body.availability);

  req.body.deposit = parseFloat(req.body.deposit);
  req.body.cleaning_fee = parseFloat(req.body.cleaning_fee);
  req.body.host_id = parseFloat(req.body.host_id);

  next();
}