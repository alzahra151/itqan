'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class excutive_plan_indicator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      excutive_plan_indicator.belongsTo(models.executive_plan, { as: 'executive_plan', foreignKey: 'executive_plan_id' });
      excutive_plan_indicator.belongsTo(models.indicator, { as: 'indicator', foreignKey: 'indicator_id' });
    }
  }
  excutive_plan_indicator.init({
    executive_plan_id: DataTypes.INTEGER,
    indicator_id:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'excutive_plan_indicator',
  });
  return excutive_plan_indicator;
};