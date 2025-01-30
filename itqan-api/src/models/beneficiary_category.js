'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class beneficiary_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // beneficiary_category.hasMany(models.executive_plan, { as: "executive_plans", foreignKey: "beneficiary_cate_id" });
      // beneficiary_category.hasMany(models.beneficiary, { as: "beneficiaries", foreignKey: "beneficiary_cate_id" });
    }
  }
  beneficiary_category.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'beneficiary_category',
  });
  return beneficiary_category;
};