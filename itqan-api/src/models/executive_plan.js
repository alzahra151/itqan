'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class executive_plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      executive_plan.belongsTo(models.activity, { as: "activity", foreignKey: "activity_id" });
      // executive_plan.belongsTo(models.beneficiary_category, { as: "beneficiary_category", foreignKey: "beneficiary_cate_id" });
      // executive_plan.belongsTo(models.Strategic_plan, { as: "Strategic_plan", foreignKey: "Strategic_plan_id" });
      executive_plan.belongsTo(models.sub_goal, { as: "sub_goal", foreignKey: "sub_goal_id" });
      executive_plan.hasMany(models.mission, { as: "missions", foreignKey: "executive_plan_id" });
      executive_plan.hasMany(models.mission_completed, { as: "completed_missions", foreignKey: "executive_plan_id" });
      executive_plan.belongsTo(models.phased_plan, { as: "phased_plan", foreignKey: "phased_plan_id" });
      executive_plan.belongsTo(models.employee, { as: "executive_plan", foreignKey: "approval_employee_id" });//emplyee approve plan
      executive_plan.hasMany(models.excutive_plan_employee_benficiary, { as: "employeesbeneficiary", foreignKey: "executiv_plan_id" });
      executive_plan.hasMany(models.excutive_plan_benficiary, { as: "beneficiaries", foreignKey: "executive_plan_id" });
      executive_plan.hasMany(models.excutive_plan_indicator, { as: "indicators", foreignKey: "executive_plan_id" });
      executive_plan.hasMany(models.excutive_plan_expected_impact, { as: "expected_impacts", foreignKey: "executive_plan_id" });
      executive_plan.hasMany(models.excutive_plan_director_board, { as: "directors_board", foreignKey: "executive_plan_id" });
    }
  }
  executive_plan.init({
    name: DataTypes.STRING,
    plan_name: DataTypes.STRING,
    // main_goal: DataTypes.STRING,
    Requirements: DataTypes.STRING,
    expected_impact: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    description: DataTypes.STRING,
    approval_employee_id: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    implementation_place: DataTypes.STRING,
    activity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: DataTypes.ENUM("الموظفين", "مجتمعى", "المرضى"),
    phased_plan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    approval: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    sub_goal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    repetition_on_faild: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    is_successful: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    automated_reports: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    follow_up: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    out_of_plan: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    repeat_type:{
      type: DataTypes.ENUM('daily', 'weekly', 'monthly', 'none'), // Repeat frequency
      defaultValue: "none"
    },
    repeat_until: DataTypes.DATE, // Optional end date for repetition
    repeat_interval: DataTypes.INTEGER, // e.g., repeat every '2' days or months
    original_plan_id: DataTypes.INTEGER,
    last_created_date: DataTypes.DATE,
    is_original: DataTypes.BOOLEAN,
    // reminder_date: DataTypes.DATE,
    completion_requires_beneficiaries: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'executive_plan',
  });
  return executive_plan;
};