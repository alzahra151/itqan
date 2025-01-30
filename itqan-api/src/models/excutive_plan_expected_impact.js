'use strict';
const {
  Model
} = require('sequelize');
const expected_impact = require('./expected_impact');
module.exports = (sequelize, DataTypes) => {
  class excutive_plan_expected_impact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      excutive_plan_expected_impact.belongsTo(models.executive_plan, { as: 'executive_plan', foreignKey: 'executive_plan_id' });
      excutive_plan_expected_impact.belongsTo(models.expected_impact, { as: 'expected_impact', foreignKey: 'expected_impact_id' });
    }
  }
  excutive_plan_expected_impact.init({
    executive_plan_id: DataTypes.INTEGER,
    expected_impact_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'excutive_plan_expected_impact',
  });
  return excutive_plan_expected_impact;
};