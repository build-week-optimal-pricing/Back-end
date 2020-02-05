const server = require('./serverBuild');
const request = require('supertest');

describe('api router test block', () => {
  it ('is connected to server', async () => {
    const res = await request(server).get('/api')

    expect(res.status).toBe(200);
    expect(res.body.serverConnect).toEqual('connected');
  })

  it ('catches 404 errors', async () => {
    const res = await request(server).get('/api/cat');

    expect(res.status).toBe(404);
    expect(res.body.message).toEqual('resource not found in api')
  })

})