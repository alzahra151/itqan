'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class association extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      association.hasMany(models.beneficiary_sevice, { as: "beneficiary_sevices", foreignKey: "association_id" });
      association.hasMany(models.activity, { as: "activities", foreignKey: "association_id" });
      association.hasMany(models.administration, { as: "administrations", foreignKey: "association_id" });
      association.hasMany(models.beneficiary, { as: "beneficiaries", foreignKey: "association_id" });
      association.hasMany(models.employee, { as: "employees", foreignKey: "association_id" });
      association.hasMany(models.role, { as: "roles", foreignKey: "association_id" });
      association.hasMany(models.service, { as: "services", foreignKey: "association_id" });
      association.hasMany(models.Strategic_plan, { as: "Strategic_plans", foreignKey: "association_id" });
      association.hasMany(models.stakeholder, { as: "stakeholders", foreignKey: "association_id" });
      association.hasMany(models.department, { as: "departments", foreignKey: "association_id" });
      association.hasMany(models.directors_board, { as: "directors_board", foreignKey: "association_id" });
      association.hasMany(models.supporter, { as: "supporters", foreignKey: "association_id" });
      association.hasMany(models.volunteer, { as: "volunteers", foreignKey: "association_id" });
    }
  }
  association.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    number: DataTypes.INTEGER,
    address: DataTypes.STRING,
    mobile: DataTypes.STRING,
    mobile2: DataTypes.STRING,
    phone: DataTypes.STRING,
    phone2: DataTypes.STRING,
    CR_number: DataTypes.INTEGER,
    tax_number: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'association',
  });
  return association;
};