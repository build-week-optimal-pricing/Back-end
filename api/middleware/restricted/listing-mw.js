

const addListingMw = [
  listing__payloadExists,
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
    console.log(req.body.host_id, 'next');
    next();
  } else {
    console.log(req.body.host_id, 'error');
    res.status(400).json({ error: `missing required host_id` })
  }
}

function cleanData(req, res, next) {
  req.body.image = req.body.image ? req.body.image.toString() : undefined;
  req.body.street = req.body.street ? req.body.street.toString() : undefined;
  req.body.city = req.body.city ? req.body.city.toString() : undefined;
  req.body.state = req.body.state ? req.body.state.toString() : undefined;
  req.body.zip = req.body.zip ? req.body.zip.toString() : undefined;
  req.body.room_type = req.body.room_type ? req.body.room_type.toString() : undefined;
  req.body.neighborhood = req.body.neighborhood ? req.body.neighborhood.toString() : undefined;

  req.body.bedrooms = req.body.bedrooms ? parseInt(req.body.bedrooms) : undefined;
  req.body.bathrooms = req.body.bathrooms ? parseInt(req.body.bathrooms) : undefined;
  req.body.beds = req.body.beds ? parseInt(req.body.beds) : undefined;
  req.body.availability = req.body.availability ? parseInt(req.body.availability) : undefined;

  req.body.deposit = req.body.deposit ? parseFloat(req.body.deposit) : undefined;
  req.body.cleaning_fee = req.body.cleaning_fee ? parseFloat(req.body.cleaning_fee) : undefined;
  req.body.host_id = req.body.host_id ? parseInt(req.body.host_id) : undefined;

  next();
}