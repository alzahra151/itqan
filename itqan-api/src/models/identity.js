'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class identity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      identity.belongsTo(models.beneficiary, { as: "beneficiary", foreignKey: "beneficiary_id" })
    }
  }
  identity.init({
    type: DataTypes.STRING,
    value: DataTypes.STRING,
    beneficiary_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'identity',
  });
  return identity;
};