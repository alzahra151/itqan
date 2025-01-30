'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      mission.belongsTo(models.administration, { as: "administration", foreignKey: "administration_id" })
      mission.belongsTo(models.employee, { as: "employee", foreignKey: "employee_id" })
      mission.belongsTo(models.executive_plan, { as: "executive_plan", foreignKey: "executive_plan_id" })
      mission.hasMany(models.completed_procedure, { as: "completed_procedures", foreignKey: "mission_id" });
    }
  }
  mission.init({
    name: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    number_value: DataTypes.INTEGER,
    evaluation_method: DataTypes.STRING,
    procedure: DataTypes.ENUM('approval', 'implementation', "supervising", "evaluation","authentication"),
    // procedure: DataTypes.STRING,
    procedure_date: DataTypes.DATE,
    description: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM("pending", "approved", "continues", "completed", "late"),
      defaultValue:"pending"
    },
    reminder_date: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'mission',
  });
  return mission;
};