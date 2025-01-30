'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class goal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // goal.belongsTo(models.Strategic_plan, { foreignKey: "strategic_plan_id", as: "strategic_plan" });
      goal.hasMany(models.sub_goal, { as: "sub_goals", foreignKey: "goal_id" });
      // goal.hasMany(models.executive_plan, { as: "executive_plans", foreignKey: "goal_id" });
      goal.hasMany(models.phased_plan, { as: "phased_plans", foreignKey: "goal_id" });
    }
  }
  goal.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    abbreviation: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'goal',
  });
  return goal;
};