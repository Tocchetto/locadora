import Sequelize, { Model } from 'sequelize';

class Rent extends Model {
  static init(sequelize) {
    super.init(
      {
        quantity: Sequelize.INTEGER,
        rented_at: Sequelize.DATE,
        returned_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.Disk, { foreignKey: 'disk_id' });
  }
}

export default Rent;
