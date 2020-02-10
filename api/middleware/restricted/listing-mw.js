const putListingMw = [//add host_id check in payload body
  listing__payloadExists,
  checkHostId_InPayload,
  //
  cleanData
]

const addListingMw = [//add host_id check in payload body
  listing__payloadExists,
  //
  checkHostId_InPayload,
  cleanData,
  //
  listing__payloadHasNecessaryProps,
  //
  
]

const getQuoteMw = [
  listing__payloadExists,
  //
  listing__payloadHasNecessaryProps,
  //
  cleanData
]

module.exports = {
  addListingMw,
  getQuoteMw,
  putListingMw,

}

//sanity
function listing__payloadExists(req, res, next) {
  if(Object.getOwnPropertyNames(req.body).length) {
    next();
  } else {
    res.status(400).json({ error: `endpoint requires payload` })
  }
}

function checkHostId_InPayload(req, res, next) {

  req.body.host_id 
    ?
      (() => {
        if(req.tokenHostId == req.body.host_id) {
          next()
        } else {
          res.status(401).json({ message: `host_id given in payload does not match authorization` })
        }
      })()
    :
      res.status(400).json({ message: `host_id credentials missing in payload` })
}

function listing__payloadHasNecessaryProps(req, res, next) {
  if(
    !req.body.host_id || 
    !req.body.room_type ||
    !req.body.neighborhood 
  ) {
      const necessities = ['host_id', 'room_type', 'neighborhood'];
      const missingArr = necessities.filter(e => {
        return !req.body[e];
    })

    res.status(400).json({ error: `missing required entities in payload body`, missing: missingArr })

  } else {
    next();
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