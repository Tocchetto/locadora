import Sequelize, { Model } from 'sequelize';

class Movie extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        director: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
        quantity: Sequelize.INTEGER
      },
      {
        sequelize
      }
    );
  }
}

export default Movie;
