//build
require('dotenv').config();
const router = require('express').Router();
//auth routes
const loginRouter = require('./login-router');
const regHostRouter = require('./regHost-router');
const regAdminRouter = require('./regAdmin-router');

router.use('/registerHost', regHostRouter);
router.use('/registerAdmin', regAdminRouter);
router.use('/login', loginRouter);

//test get
router.get('/', (req, res) => {
  res.status(200).json({ message: `auth connected to server` })
})
//fallback
router.use((req, res) => {
  res.status(404).json({ message: `resource not found in auth routes` });
});

module.exports = router;