'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class excutive_plan_employee_benficiary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      excutive_plan_employee_benficiary.belongsTo(models.employee, { as: 'employee', foreignKey: 'employee_id', foreignKeyConstraint: true, constraints: false });
      excutive_plan_employee_benficiary.belongsTo(models.executive_plan, { as: 'executive_plan', foreignKey: 'executiv_plan_id', foreignKeyConstraint: true, constraints: false });
    }
  }
  excutive_plan_employee_benficiary.init({
    employee_id: DataTypes.INTEGER,
    executiv_plan_id: DataTypes.INTEGER,
    service_done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    note: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'excutive_plan_employee_benficiary',
  });
  return excutive_plan_employee_benficiary;
};