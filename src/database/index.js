import Sequelize from 'sequelize';

import User from '../app/models/User';
import Movie from '../app/models/Movie';

import databaseConfig from '../config/database';

const models = [User, Movie];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
