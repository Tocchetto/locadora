import Sequelize, { Model } from 'sequelize';

class Movie extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        director: Sequelize.STRING,
        quantity: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Movie;
