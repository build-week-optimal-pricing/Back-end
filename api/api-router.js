//build
const router = require('express').Router();
//docs
const responseDocs = require('./docs/api-docs.js');
//routes
const authRouter = require('./auth/auth-router.js');
const restrictedRouter = require('./restricted/restricted-router');
//mw
const { restricted } = require('./middleware/restricted')

router.use('/auth', authRouter);
router.use('/restricted', restricted, restrictedRouter);

router.get('/docs', (req, res) => {
  res.status(200).send(responseDocs);
})

router.get('/', (req, res) => {
  res.status(200).json({ serverConnect: `connected` });
});

router.use((req, res) => {
  res.status(404).json({ message: `resource not found in api` })
});

module.exports = router;