import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RentController from './app/controllers/RentController';

import MovieController from './app/controllers/MovieController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/movies', MovieController.store);
routes.get('/movies', MovieController.index);
routes.get('/movie', MovieController.show);

routes.post('/rents', RentController.store);
routes.put('/rents', RentController.update);

export default routes;
