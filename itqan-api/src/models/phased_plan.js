'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class phased_plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      phased_plan.belongsTo(models.goal, { as: "goal", foreignKey: "goal_id" });
      phased_plan.belongsTo(models.Strategic_plan, { as: "Strategic_plan", foreignKey: "Strategic_plan_id" });
      phased_plan.hasMany(models.executive_plan, { as: "executive_plans", foreignKey: "phased_plan_id" })
      // phased_plan.hasMany(models.sub_goal, { as: "sub_goals", foreignKey: "phased_plan_id" })
      phased_plan.hasMany(models.phased_plan_sub_goal, { as: "sub_goals", foreignKey: "phased_plan_id" });
    }
  }
  phased_plan.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    goal_id: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    Strategic_plan_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'phased_plan',
  });
  return phased_plan;
};