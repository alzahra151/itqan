'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class close_person extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      close_person.belongsTo(models.beneficiary, { as: "beneficiary", foreignKey: "beneficiary_id" })

    }
  }
  close_person.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    mobile: DataTypes.STRING,
    beneficiary_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'close_person',
  });
  return close_person;
};