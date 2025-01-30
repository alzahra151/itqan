'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class phased_plan_sub_goal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      phased_plan_sub_goal.belongsTo(models.phased_plan, { as: 'phased_plan', foreignKey: 'phased_plan_id' });
      phased_plan_sub_goal.belongsTo(models.sub_goal, { as: 'sub_goal', foreignKey: 'sub_goal_id' });
    }
  }
  phased_plan_sub_goal.init({
    phased_plan_id: DataTypes.INTEGER,
    sub_goal_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'phased_plan_sub_goal',
  });
  return phased_plan_sub_goal;
};