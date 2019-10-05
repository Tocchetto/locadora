import Sequelize, { Model } from 'sequelize';

class Rent extends Model {
  static init(sequelize) {
    super.init(
      {
        rented_at: Sequelize.DATE,
        returned_at: Sequelize.DATE,
        quantity: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'id_user' });
    this.belongsTo(models.Movie, { foreignKey: 'id_movie' });
  }
}

export default Rent;
