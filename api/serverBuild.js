//build
const server = require('express')();
const build = require('./middleware/server-mw');
//api
const apiRouter = require('./api-router.js');

build(server);

server.use((req, res, next) => {
    // which origins reqs can come from
    res.header('Access-Control-Allow-Origin', '*');
    // what kind of headers we can receive
    res.header('Access-Control-Allow-Headers', '*');

    // inform client accepted methods
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({})
    }
});

server.use('/api', apiRouter);

server.get('/', (req, res) => {
  res.status(200).json({ serverConnect: `connected` });
})
server.use((req, res) => {
  res.status(404).json({ error: `Resource not found on server` })
})

module.exports = server;