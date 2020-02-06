/**
 * @jest-environment node
 */

require('dotenv').config();

//build test server
const server = require('../serverBuild');
const request = require('supertest');
//jwt
const jwt = require('jsonwebtoken');
//db
const db = require('../../data/dbConfig');

describe('listing-router test block', () => {

let hostId;
beforeEach(async () => {
  await db('hosts').del();
  await db('listings').del();

  const reg_res = await request(server).post('/api/auth/registerHost')
  .set('Content-Type', 'application/json')
  .send({ username: 'hooi', password: 'host' })

  if(reg_res.body && reg_res.body.resource) {
    hostId = reg_res.body.resource.id
  } else {
    console.log(reg_res.body, 'reg_res');
  }
  return;
})

afterEach(async () => {
  await db('hosts').del();
  await db('listings').del();
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

      const res = await request(server).get(`/api/restricted/listings/${hostId}`)
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
        .set('Accept', 'application/json')
        .set('authorization', token)
        .send({
          "host_id": hostId,
          "room_type": "Private room",
          "neighborhood": "Reinickendorf"
        })

      expect(res.status).toBe(200);
      expect(res.body.resource.host_id).toEqual(hostId);

    })
  })

  describe('DELETE /api/restricted/listings/:listingId', () => {
    it('can delete a listing', async () => {
      // const post = await request(server).post('/api/restricted/listings')
      //   .set('Accept', 'application/json')
      //   .set('authorization', token)
      //   .send({
      //     "host_id": hostId,
      //     "room_type": "Private room",
      //     "neighborhood": "Reinickendorf"
      //   })
      // const listingId = post.body.resource.id;
      let ids
      await db('listings').insert({
        "host_id": hostId,
        "room_type": "Private room",
        "neighborhood": "Reinickendorf"
      }).then( res => {
        ids = res[0];
      })

      console.log(ids);

      // const res = await request(server).delete(`/api/restricted/listings/${parseInt(ids[0])}`)
      //   .set('Accept', 'application/json')
      //   .set('authorization', token)

      // expect(res.status).toBe(200);
      // expect(res.body.resource).toBe(1);

    })
  })

  describe('POST /api/restricted/listings/getQuote', () => {
    it('can get a listing quote', async () => {
      const res = await request(server).post('/api/restricted/listings/getQuote')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .send({
          "host_id": hostId,
          "room_type": "Private room",
          "neighborhood": "Reinickendorf"
        })

      expect(res.status).toBe(200);
      expect(res.body.resource.host_id).toEqual(hostId);

    })
  })
})