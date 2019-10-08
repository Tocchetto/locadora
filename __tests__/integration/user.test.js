import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../src/app';

import User from '../../src/app/models/User';
import Movie from '../../src/app/models/Movie';
import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('User password must be at least six characters', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Guilherme Tocchetto',
        email: 'tocchettoo@gmail.com',
        password: '1234',
      });

    expect(response.status).toBe(400);
  });

  it('Password must be encrypted when a new user is created', async () => {
    const user = await User.create({
      name: 'Guilherme Tocchetto',
      email: 'tocchettoo@gmail.com',
      password: '12345678',
    });

    const compareHash = await bcrypt.compare('12345678', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('User must be able to register.', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Guilherme Tocchetto',
        email: 'tocchettoo@gmail.com',
        password: '12345678',
      });

    expect(response.body).toHaveProperty('id');
  });

  it('User should not be able to register with a duplicate email.', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Guilherme Tocchetto',
        email: 'tocchettoo@gmail.com',
        password: '12345678',
      });

    const response = await request(app)
      .post('/users')
      .send({
        name: 'Guilherme Tocchetto',
        email: 'tocchettoo@gmail.com',
        password: '12345678',
      });

    expect(response.status).toBe(400);
  });
});

describe('Movie', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('must be authenticated to retrive movies', async () => {
    const response = await request(app).get('/movies');

    expect(response.status).toBe(401);
  });
});
