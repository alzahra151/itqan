'use strict';
const { Model, INTEGER } = require('sequelize');
const Employee = require('./employee');
module.exports = (sequelize, DataTypes) => {
  class department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      department.belongsTo(models.administration, { as: "administration", foreignKey: "administration_id" });
      department.belongsTo(models.association, { as: "association", foreignKey: "association_id" });
      department.hasMany(models.employee, { as: "employees", foreignKey: "department_id" }, { onDelete: "RESTRICT" });
    }
  }
  department.init({
    name: DataTypes.STRING,
    code: DataTypes.INTEGER,
    transfer_number: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'department',
  });

  return department;
};