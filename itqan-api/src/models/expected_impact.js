'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class expected_impact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      expected_impact.hasMany(models.excutive_plan_expected_impact, { as: "executive_plans", foreignKey: "expected_impact_id" });
    }
  }
  expected_impact.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    association_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    target: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'expected_impact',
  });
  return expected_impact;
};