'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class beneficiary_sevice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      beneficiary_sevice.belongsTo(models.beneficiary, { as: 'beneficiary', foreignKey: 'beneficiary_id' });
      beneficiary_sevice.belongsTo(models.service, { as: 'service', foreignKey: 'service_id' });
    }
  }
  beneficiary_sevice.init({
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    repeat_days: {
      type: DataTypes.JSON,
      allowNull: true // Or false depending on your requirements
    },
    service_id: DataTypes.INTEGER,
    beneficiary_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'beneficiary_sevice',
  });
  return beneficiary_sevice;
};