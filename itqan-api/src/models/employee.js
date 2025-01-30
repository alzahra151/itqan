'use strict';
const {
  Model,
  INTEGER
} = require('sequelize');
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  class employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      employee.belongsTo(models.department, { as: "department", foreignKey: "department_id" })
      employee.belongsTo(models.role, { as: "role", foreignKey: "role_id" })
      employee.hasMany(models.mission, { as: "missions", foreignKey: "employee_id" });
      employee.hasMany(models.mission_completed, { as: "completed_missions", foreignKey: "employee_id" });
      employee.hasMany(models.excutive_plan_employee_benficiary, { as: "exective_plans", foreignKey: "employee_id" });
      employee.hasMany(models.executive_plan, { as: "appoved_exective_plans", foreignKey: "approval_employee_id" });
      employee.belongsTo(models.association, { as: "association", foreignKey: "association_id" })
    }
  }
  employee.init({
    name: DataTypes.STRING,
    job_number: DataTypes.STRING,
    ID_number: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.ENUM("ذكر", "انثى"),
    birth_date: DataTypes.DATE,
    mobile: DataTypes.STRING,
    image: DataTypes.STRING,
    password: DataTypes.STRING,
    otp: DataTypes.STRING,
    otpExpier: DataTypes.DATE,
    email: DataTypes.STRING,
    user_name: DataTypes.STRING,
    active_on_system: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'employee',
  });

  employee.beforeCreate(async (employee) => {
    if (employee.password) {
      const salt = await bcrypt.genSaltSync(10, "a");
      employee.password = bcrypt.hashSync(employee.password, salt);
    }
  });
  // employee.beforeUpdate(async (employee) => {
  //   const salt = await bcrypt.genSaltSync(10, "a");
  //   employee.password = bcrypt.hashSync(employee.password, salt);
  // });
  employee.beforeUpdate(async (employee, options) => {
    if (employee.changed('password')) {
      const hashedPassword = await bcrypt.hash(employee.password, 10);
      employee.password = hashedPassword;
    }
  });
  return employee;
};