require('dotenv').config();
//build
const server = require('../serverBuild');
const request = require('supertest');
const db = require('../../data/dbConfig');
//auth
const jwt = require('jsonwebtoken');

let hostId;
beforeEach(async () => {
  await db('hosts').del();
  await db('listings').del();
  // in order to test .post, I need to retrieve the hostId, which is a property returned from registering
  // however I can't seem to register because my cleaners aren't killing hosts
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

describe('host router test block', () => {
  it ('tests sanely', () => {
    expect(true).toBe(true);
  })

  describe('/api/restricted/hosts/:hostId GET', () => {
    it('receives GET', async () => {
      const res = await request(server).get(`/api/restricted/hosts/${hostId}`)
        .set('Content-Type', 'application/json')
        .set('authorization', token)

      console.log(hostId, res.body.resource.id, 'the two ids');

      expect(res.status).toBe(200);
      expect(res.type).toMatch(/json/i);
      expect(res.body.message).toBe('fetched host');
      
    })

    it ('retrieves information about the right host', async () => {
      const res = await request(server).get(`/api/restricted/hosts/${hostId}`)
        .set('Content-Type', 'application/json')
        .set('authorization', token)

      // for some reason plugged in directly does not work
      const returnedId = res.body.resource.id;

      expect(returnedId).toBe(hostId);
    })
  })

  describe('/api/restricted/hosts/:hostId PUT', () => {
    it ('edits host data', async () => {
      const res = await request(server).put(`/api/restricted/hosts/${hostId}`)
        .set('Accept', 'application/json')
        .set('authorization', token)
        .send({
          num_reviews: 1,
          last_review_time: 1
        })

      expect(res.status).toBe(200);
      expect(res.type).toMatch(/json/i);
    })
  })

  describe('/api/restricted/hosts/:hostId DEL', () => {
    it ('deletes host', async () => {
      const res = await request(server).delete(`/api/restricted/hosts/${hostId}`)
        .set('Content-Type', 'application/json')
        .set('authorization', token)
        
      expect(res.status).toBe(200);
      expect(res.type).toMatch(/json/i);
      expect(res.body.message).toBe('deleted host');
      expect(res.body.resource).toBe(1);
    })
  })
})