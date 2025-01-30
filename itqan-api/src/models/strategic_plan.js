'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Strategic_plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Strategic_plan.hasMany(models.goal, { as: "goals", foreignKey: "Strategic_plan_id" });
      Strategic_plan.hasMany(models.sub_goal, { as: "sub_goals", foreignKey: "Strategic_plan_id" });
      // Strategic_plan.belongsTo(models.executive_plan, { as: "executive_plan", foreignKey: "executive_plan_id" })
      Strategic_plan.hasMany(models.phased_plan, { as: "phased_plans", foreignKey: "Strategic_plan_id" });
      Strategic_plan.belongsTo(models.association, { as: "association", foreignKey: "association_id" })
    }
  }
  Strategic_plan.init({
    name: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    introduction: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Strategic_plan',
  });
  return Strategic_plan;
};