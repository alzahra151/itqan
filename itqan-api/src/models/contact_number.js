'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contact_number extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      contact_number.belongsTo(models.beneficiary, { as: "beneficiary", foreignKey: "beneficiary_id" })
    }
  }
  contact_number.init({
    number: DataTypes.STRING,
    type: DataTypes.ENUM("home", "work", "phone", "whatsApp", "close_person")
  }, {
    sequelize,
    modelName: 'contact_number',
  });
  return contact_number;
};