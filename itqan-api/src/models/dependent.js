'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dependent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      dependent.belongsTo(models.beneficiary, { as: "beneficiary", foreignKey: "beneficiary_id" })
    }
  }
  dependent.init({
    kinship: DataTypes.STRING,
    numbers: DataTypes.INTEGER,
    beneficiary_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'dependent',
  });
  return dependent;
};