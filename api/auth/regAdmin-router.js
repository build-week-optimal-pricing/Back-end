//build
const router = require('express').Router();
//db helpers
const { adminControls} = require('../../data/routeHelpers/auth-model');
//mw
const { regAdminMw } = require('../middleware/auth/reg-mw');

router.post('/', ...regAdminMw, (req, res) => {

  adminControls.addAdmin(req.body)
    .then( resou => {
      res.status(201).json({ message: `added new admin`, resource: resou[0] })
    })
    .catch( err => {
      console.log(err)
      res.status(500).json({ error: `could not register admin user` })
    })
});

router.delete('/:adminId', (req, res) => {
  const adminId = parseInt(req.params.adminId);
  adminControls.removeAdmin(adminId)
    .then( resou => {
      console.log(resou, 'log of .removeAdmin resource resolving');
      resou
        ?
          res.status(200).json({ message: `deleted admin`, resource: resou })
        :
          res.status(400).json({ error: `admin does not exist`, resource: resou })
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({ error: `internal server error, could not delete admin`})
    })
      
})

router.get('/', (req, res) => {
  res.status(200).json({ serverConnect: `connected` });
});

module.exports = router;