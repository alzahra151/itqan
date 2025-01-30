'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class excutive_plan_benficiary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      excutive_plan_benficiary.belongsTo(models.beneficiary, { as: 'beneficiary', foreignKey: 'beneficiary_id' });
      excutive_plan_benficiary.belongsTo(models.executive_plan, { as: 'executive_plan', foreignKey: 'executive_plan_id' });
    }
  }
  excutive_plan_benficiary.init({
    type: DataTypes.STRING,
    beneficiary_id: DataTypes.INTEGER,
    executive_plan_id: DataTypes.INTEGER,
    service_done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    note: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'excutive_plan_benficiary',
  });
  return excutive_plan_benficiary;
};