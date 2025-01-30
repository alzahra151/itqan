'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class indicator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      indicator.hasMany(models.excutive_plan_indicator, { as: "executive_plans", foreignKey: "indicator_id" });
    }
  }
  indicator.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    association_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    target: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'indicator',
  });
  return indicator;
};