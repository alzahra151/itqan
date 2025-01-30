'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mission_completed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      mission_completed.belongsTo(models.administration, { as: "administration", foreignKey: "administration_id" })
      mission_completed.belongsTo(models.employee, { as: "employee", foreignKey: "employee_id" })
      mission_completed.belongsTo(models.executive_plan, { as: "executive_plan", foreignKey: "executive_plan_id" })
    }
  }
  mission_completed.init({
   date: DataTypes.DATE,
    number_value: DataTypes.STRING,
    description: DataTypes.STRING,
    executive_plan_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'mission_completed',
  });
  return mission_completed;
};