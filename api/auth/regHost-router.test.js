//test builders
const server = require('../serverBuild');
const request = require('supertest');
//db
const db = require('../../data/dbConfig');

describe.skip('host registration test block', () => {

  function cleanUp() {
    return db('listings').del()
      .then(rr => {
        return db('hosts').del();
      })
  }

  beforeAll(() => {
    return cleanUp();
  })

  afterAll(() => {
    return cleanUp();
  })

  it ('connects to server', async () => {
    const res = await request(server).get('/api/auth/registerHost/');

    expect(res.status).toBe(200);
    expect(res.type).toMatch(/json/i);
    expect(res.body.message).toEqual('fetched hosts');
  })

  describe('POST /api/auth/registerHost', () => {
    it ('registers a host', async () => {

      const res = await request(server)
        .post('/api/auth/registerHost/')
        .set('Content-Type', 'application/json')
        .send({ username: 'hooitestaccount', password: 'hooipass' })

      expect(res.status).toBe(201);
      expect(res.type).toMatch(/json/i);
      expect(res.body.message).toBe('added new host');
      expect(res.body.resource.username).toEqual('hooitestaccount');
    })
  })
})