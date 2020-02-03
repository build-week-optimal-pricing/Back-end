// root consumables
require('dotenv').config();
const server = require('./api/serverBuild.js');

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`sErVEr rUNniNg oN poRT: ${port}`));