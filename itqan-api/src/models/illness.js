'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class illness extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      illness.belongsTo(models.beneficiary, { as: "beneficiary", foreignKey: "beneficiary_id" })
    }
  }
  illness.init({
    name: DataTypes.STRING,
    injury_history: DataTypes.DATE,
    illness_nature: DataTypes.STRING,
    latest_diagnosis: DataTypes.STRING,
    attachments: DataTypes.JSON,
    beneficiary_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'illness',
  });
  return illness;
};