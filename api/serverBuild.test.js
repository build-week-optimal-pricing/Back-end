const server = require('./serverBuild');
const request = require('supertest');

describe.skip('server', () => {
  it ('tests sanely', () => {
    expect(true).toBe(true);
  })

  describe('server should be receptive to root GET', () => {

    it ('connects on a GET', async () => {
      const res = await request(server).get('/');

      expect(res.status).toBe(200);
      expect(res.body.serverConnect).toBe('connected');
    })

    it ('catches 404s', async () => {
      const res = await request(server).get('/cats');

      expect(res.status).toBe(404);
      expect(res.body.error).toEqual(`Resource not found on server`)
    })
  })
})