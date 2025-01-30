'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class beneficiary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // beneficiary.belongsTo(models.beneficiary_category, { as: "beneficiary_category", foreignKey: "beneficiary_cate_id" })
      beneficiary.hasMany(models.contact_number, { as: "contact_numbers", foreignKey: "beneficiary_id", onDelete: "CASCADE", });
      beneficiary.hasMany(models.dependent, { as: "dependents", foreignKey: "beneficiary_id", onDelete: "CASCADE", });
      beneficiary.hasOne(models.illness, { as: "illnesse", foreignKey: "beneficiary_id" });
      beneficiary.hasMany(models.attachment, { as: "attachments", foreignKey: "beneficiary_id", onDelete: "CASCADE", });
      beneficiary.hasMany(models.beneficiary_sevice, { as: "beneficiary_sevices", foreignKey: "beneficiary_id" });
      beneficiary.hasMany(models.excutive_plan_benficiary, { as: "exective_plans", foreignKey: "beneficiary_id" });
      beneficiary.hasOne(models.close_person, { as: "close_person", foreignKey: "beneficiary_id", onDelete: "CASCADE", });
      beneficiary.hasOne(models.identity, { as: "identity", foreignKey: "beneficiary_id", onDelete: "CASCADE", });
      beneficiary.belongsTo(models.association, { as: "association", foreignKey: "association_id" })

    }
  }
  beneficiary.init({
    name: DataTypes.STRING,
    record_history: DataTypes.DATE,
    file_no: DataTypes.INTEGER,
    gender: DataTypes.ENUM("ذكر", "انثى"),
    birth_date: DataTypes.DATE,
    nationality: DataTypes.STRING,
    marital_status: DataTypes.STRING,
    educational_level: DataTypes.STRING,
    scientific_certificates: DataTypes.STRING,
    job: DataTypes.STRING,
    employer: DataTypes.STRING,
    monthly_income_from: DataTypes.INTEGER,
    monthly_income_to: DataTypes.INTEGER,
    housing_type: DataTypes.STRING,
    mobility_status: DataTypes.STRING,
    email: DataTypes.STRING,
    home_address: DataTypes.STRING,
    work_address: DataTypes.STRING,
    Image: DataTypes.STRING,
    // age: DataTypes.INTEGER,
    type: DataTypes.ENUM("الموظفين", "مجتمعى", "المرضى"),
    association_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'beneficiary',
  });
  return beneficiary;
};