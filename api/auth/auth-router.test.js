const server = require('../serverBuild');
const request = require('supertest');

describe('auth-router test block', () => {
  it ('is connected to server', async () => {
    const res = await request(server).get('/api/auth');

    expect(res.status).toBe(200);
    expect(res.body.message).toEqual('auth connected to server');
  })

  it ('catches 404 errors', async () => {
    const res = await request(server).get('/api/auth/cats');

    expect(res.status).toBe(404);
    expect(res.body.message).toEqual('resource not found in auth routes');
  })
})