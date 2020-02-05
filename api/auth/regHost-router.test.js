//test builders
const server = require('../serverBuild');
const request = require('supertest');
//db
const db = require('../../data/dbConfig');

describe('host registration test block', () => {
// I only need to test post request here actually. 
  beforeAll(() => {
    return db('hosts').del();
  })

  afterAll(() => {
    return db('hosts').del();
  })
  // I delete all host records before so that the tests start in a clean slate
  // I delete all host records after so that proceeding tests start in a clean slate clean

  it ('connects to server', async () => {
    const res = await request(server).get('/api/auth/registerHost/');

    expect(res.status).toBe(200);
    expect(res.type).toMatch(/json/i);
    expect(res.body.message).toEqual('fetched hosts');
  })

  describe('POST /api/auth/registerHost', async () => {

  })
})