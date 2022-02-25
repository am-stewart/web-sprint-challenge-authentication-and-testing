const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server')

test('sanity', () => {
  expect(true).toBe(true)
})

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run
})
afterAll(async () => {
  await db.destroy()
})

describe('[GET] /api/jokes', () => {
  it('should return a token required message if missing token', async () => {
    request(server).post('/api/auth/register').send({ username: 'abc', password: '123' })
    request(server).post('/api/auth/login').send({ username: 'abc', password: '123', token: ''})
    const res = await request(server).get('/api/jokes')
    expect(res.body).toEqual({ message: 'token required' })
  })
  // it('should return token invalid message if invalid token', async () => {
  //   request(server).post('/api/auth/register').send({ username: 'john', password: '123' })
  //   const user = request(server).post('/api/auth/login').send({ username: 'john', password: '123'})
  //   request(server).post('/api/auth/login').send({token: user.headers.authorization }) 
  //   const res = await request(server).get('/api/jokes')
  //   expect(res.body).toEqual({ message: 'token invalid' })
  // })
})

describe('[POST], /api/auth/register', () => {
  it('should return username and password required message if either is not sent', async () => {
    let res = await request(server).post('/api/auth/register').send({ username: '', password: '123' })
    expect(res.body).toEqual({ message: 'username and password required'})
    res = await request(server).post('/api/auth/register').send({ username: 'abc', password: '' })
    expect(res.body).toEqual({ message: 'username and password required'})
  })
  it('should return a username is taken message is username already exists', async () => {

  })
  it('should return users information with hashed password if successful', async () => {

  })
})