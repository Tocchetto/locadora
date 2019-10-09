import request from 'supertest';
import app from '../../src/app';

import truncate from '../util/truncate';

describe('Movie', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('User should not be able to retrive a movie without being authenticated', async () => {
    const response = await request(app).get('/movie');

    expect(response.status).toBe(401);
  });

  it('User should not be able to retrive all movies without being authenticated', async () => {
    const response = await request(app).get('/movies');

    expect(response.status).toBe(401);
  });

  // it('User should be authenticated to retrive movies', async () => {
  //   await request(app)
  //     .post('/users')
  //     .send({
  //       name: 'Guilherme Tocchetto',
  //       email: 'tocchettoo@gmail.com',
  //       password: '12345678',
  //     });

  //   let token;

  //   await request(app)
  //     .post('/sessions')
  //     .send({
  //       email: 'tocchettoo@gmail.com',
  //       password: '12345678',
  //     })
  //     .then((err, response) => {
  //       token = response.body.token;
  //     });

  //   const response = await request(app)
  //     .get('/movies')
  //     .set('Authorization', `Bearer ${token}`);

  //   expect(response).toBe(200);
  // });
});
