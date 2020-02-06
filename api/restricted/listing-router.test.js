require('dotenv').config();
//build test server
const server = require('../serverBuild');
const request = require('supertest');
//jwt
const jwt = require('jsonwebtoken');
//db
const db = require('../../data/dbConfig_test');

describe('listing-router test block', () => {
// testing set-up
// in order to visit these routes, my requests need to include token auth

let hostId;
function cleanUp(done) {
  return db('listings').del()
    .then(rr => {
      return db('hosts').del()
        .then(r => {
          request(server).post('/api/auth/registerHost').send({ username: 'hooi', password: 'password'})
          .then( res => {
            hostId = res.body.resource.id;
            done();
          })
        })
    })
}

beforeAll((done) => {
  return cleanUp();


})

afterAll(() => {
  return cleanUp();
})

const payload = {
  username: 'hooi',
  priveleges: 'host'
}
const secret = process.env.JWT_SECRET;

const options = {
  expiresIn: 1000 * 60 * 60 //tokens last for 60 minutes
}

const token = jwt.sign(payload, secret, options);

  describe('GET /api/restricted/listings/:hostId', () => {
    it ('receives get requests', async () => {
      const res = await request(server).get('/api/restricted/listings/1')
        .set('Content-Type', 'application/json')
        .set('authorization', token);

      expect(res.status).toBe(200);
      expect(res.type).toMatch(/json/i);
      expect(res.body.message).toBe('fetched listing by host id');
    })
  })

  describe('POST /api/restricted/listings', () => {
    it('can add a new listing', async () => {
      const res = await request(server).post('/api/restricted/listings')
        .set('Content-Type', 'application/json')
        .set('authorization', token)
        .send({
          host_id: hostId,
          room_type: "Private room",
          neighborhood: "Reinickendorf",
          zip: "92073"
        })

      expect(res.status).toBe(201);

    })
  })

})