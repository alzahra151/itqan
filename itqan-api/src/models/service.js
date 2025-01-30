'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      service.hasMany(models.beneficiary_sevice, { as: "beneficiary_sevices", foreignKey: "service_id" });
      service.belongsTo(models.association, { as: "association", foreignKey: "association_id" })
    }
  }
  service.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'service',
  });
  return service;
};