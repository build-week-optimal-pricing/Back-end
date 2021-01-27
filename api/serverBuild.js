//build
const server = require('express')();
const build = require('./middleware/server-mw');
//api
const apiRouter = require('./api-router.js');
// cors
var cors = require('cors')
server.use(cors())

build(server);

server.use('/api', apiRouter);

server.get('/', (req, res) => {
  res.status(200).json({ serverConnect: `connected` });
})
server.use((req, res) => {
  res.status(404).json({ error: `Resource not found on server` })
})

module.exports = server;