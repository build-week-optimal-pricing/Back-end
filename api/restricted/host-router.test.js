require('dotenv').config();
//build
const server = require('../serverBuild');
const request = require('supertest');
const db = require('../../data/dbConfig');

let hostId;
let token;
beforeEach(async () => {
  await db('hosts').del()
    .then(async deleteHosts => {
      await request(server).post('/api/auth/registerHost')
      .set('Content-Type', 'application/json')
      .send({ username: 'hooi', password: 'host' })
        .then(async reg_res => {
          hostId = reg_res.body.resource.id;
          await request(server).post('/api/auth/login')
            .set('Accept', 'application/json')
            .send({
              username: 'hooi',
              password: 'host'
            })
              .then(log_res => {
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

describe('host router test block', () => {
  it ('tests sanely', () => {
    expect(true).toBe(true);
  })

  describe('/api/restricted/hosts/:hostId GET', () => {
    it('receives GET', async () => {
      const res = await request(server).get(`/api/restricted/hosts/${hostId}`)
        .set('Content-Type', 'application/json')
        .set('authorization', token)

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