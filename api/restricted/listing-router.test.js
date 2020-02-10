/**
 * @jest-environment node
 */

require('dotenv').config();

//build test server
const server = require('../serverBuild');
const request = require('supertest');
//db
const db = require('../../data/dbConfig');

describe('listing-router test block', () => {

// let listingId;
let hostId;
let token;
beforeEach(async () => {
  await db('hosts').del()

    .then( deleteHosts => {
      return request(server).post('/api/auth/registerHost')
      .set('Content-Type', 'application/json')
      .send({ username: 'hooi', password: 'host' })

        .then( reg_res => {
          hostId = reg_res.body.resource.id;
          return request(server).post('/api/auth/login')
            .set('Accept', 'application/json')
            .send({
              username: 'hooi',
              password: 'host'
            })

              .then( log_res => {
                token = log_res.body.token;
                return;
              })
        })
    })
  
})

afterEach(async () => {
  await db('hosts').del();
  await db('listings').del();
})

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

  describe('POST /api/restricted/listings', () => {
    it('can add a new listing', async () => {

      const res = await request(server).post('/api/restricted/listings')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .send({
          "host_id": hostId,
          "neighborhood": "Reinickendorf",
          "bedrooms": 1,
          "bathrooms": 1,
          "beds": 1,
          "deposit": "0.08",
          "cleaning_fee": "0.08",
          "min_nights": "8",
          "room_type": "Private room"
        })

      expect(res.status).toBe(200);
      expect(res.body.resource.host_id).toEqual(hostId);

    }, 30000)
  })



  describe('DELETE /api/restricted/listings/:listingId', () => { 

    it('can delete a listing', async () => {
      let listingId;

      await request(server).post('/api/restricted/listings')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .send({
          "host_id": hostId,
          "room_type": "Private room",
          "neighborhood": "Reinickendorf"
        })
          .then(async post_res => {
            listingId = await post_res.body.resource.id;
            return;
          })

      const res = await request(server).delete(`/api/restricted/listings/${listingId}`)
      .set('Accept', 'application/json')
      .set('authorization', token)

      expect(res.status).toBe(200);
      expect(res.body.resource).toBe(1);

    })
  })

  describe('PUT /api/restricted/listings/:listingId', () => { 

    it('can edit a listing', async () => {
      let listingId;

      await request(server).post('/api/restricted/listings')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .send({
          "host_id": hostId,
          "room_type": "Private room",
          "neighborhood": "Reinickendorf"
        })
          .then(async post_res => {
            listingId = await post_res.body.resource.id;
            return;
          })

      const res = await request(server).put(`/api/restricted/listings/${listingId}`)
      .set('Accept', 'application/json')
      .set('authorization', token)
      .send({
        "host_id": hostId,
        "neighborhood": "Reinickendorf",
        "bedrooms": 50,
        "bathrooms": 50,
        "beds": 100,
        "deposit": "0.08",
        "cleaning_fee": "0.08",
        "min_nights": "8",
        "room_type": "Private room"
      })

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('consumed ds-api to return a price quote');

    })
  })

})