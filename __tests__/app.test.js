const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const mockUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  password: '12345',
};

describe('top-secrets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);
    const { firstName, lastName, email } = mockUser;

    expect(res.body).toEqual({
      id: expect.any(String),
      firstName,
      lastName,
      email,
    });
  });

  it('signs in an existing user', async () => {
    await request(app).post('/api/v1/users').send(mockUser);
    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send({ email: 'test@example.com', password: '12345' });
    expect(res.status).toEqual(200);
  });

  it('signs out a user on DELETE', async () => {
    const res = await request(app).delete('/api/v1/users/sessions').send(mockUser);
    expect(res.body).toEqual({
      message: 'Signed out successfully!'
    });
  });

  it('returns a list of secrets', async () => {
    const res = await request(app).get('/api/v1/secrets');
    expect(res.body).toContainEqual({
      title: expect.any(String),
      description: expect.any(String),
      created_at: expect.any(String)
    });
  });

});
