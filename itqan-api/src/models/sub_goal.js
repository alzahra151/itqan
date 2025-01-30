'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sub_goal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      sub_goal.belongsTo(models.goal, { foreignKey: "goal_id", as: "goal" });
      sub_goal.hasOne(models.executive_plan, { as: "executive_plan", foreignKey: "sub_goal_id" });
      sub_goal.belongsTo(models.phased_plan, { as: "phased_plan", foreignKey: "phased_plan_id" });
      sub_goal.hasMany(models.phased_plan_sub_goal, { as: "phased_plans", foreignKey: "sub_goal_id" });
      // sub_goal.belongsTo(models.Strategic_plan, { foreignKey: "strategic_plan_id", as: "strategic_plan" });
      // sub_goal.belongsTo(models.Strategic_plan, { foreignKey: "plan_id", as: "strategic_plan" });
    }
  }
  sub_goal.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    goal_abbreviation: DataTypes.STRING,
    goal_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'sub_goal',
  });
  return sub_goal;
};