import Sequelize, { Model } from 'sequelize';

class Movies extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        director: Sequelize.STRING,
        quantity: Sequelize.INTEGER,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }
}

export default Movies;
