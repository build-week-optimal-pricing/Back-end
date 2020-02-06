require('dotenv').config();
//build
const server = require('../serverBuild');
const request = require('supertest');
const db = require('../../data/dbConfig');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

describe('login router test block', () => {
  const user = {
    username: 'hooitestacc',
    password: 'hooitestpw'
  }

  function cleanUp() {
    return db('listings').del()
      .then(one => {
        return db('hosts').del()

      })
  }

  beforeAll(() => {
    return cleanUp();
  })

  afterAll(() => {
    return cleanUp();
  })

  it ('allows user to log in', async () => {

    await request(server).post('/api/auth/registerHost')
      .set('Content-Type', 'application/json')
      .send(user);

    const res = await request(server).post('/api/auth/login')        
      .set('Content-Type', 'application/json')
      .send(user);


    const payload = {
      username: 'hooitestacc',
      priveleges: 'host'
    }
    const options = {
      expiresIn: 1000 * 60 * 60 //tokens last for 60 minutes
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, options)

    expect(res.status).toBe(200);
    expect(res.type).toMatch(/json/i);
    
    expect(res.body.message).toBe('logged in with host priveleges');

    expect(res.body.resource.username).toEqual('hooitestacc');
    expect(res.body.token).toBe(token);

  })

})
