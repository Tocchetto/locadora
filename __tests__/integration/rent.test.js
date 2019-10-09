import request from 'supertest';
import app from '../../src/app';

import truncate from '../util/truncate';

describe('Movie', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('User should not be able to rent a movie without being authenticated', async () => {
    const response = await request(app)
      .post('/rents')
      .send({
        id_movie: 1,
        quantity: 2,
      });

    expect(response.status).toBe(401);
  });

  it('User should not be able to return a movie without being authenticated', async () => {
    const response = await request(app)
      .put('/rents')
      .send({
        id_movie: 1,
        quantity: 2,
      });

    expect(response.status).toBe(401);
  });
});
