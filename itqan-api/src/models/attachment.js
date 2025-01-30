'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class attachment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      attachment.belongsTo(models.beneficiary, { as: "beneficiary", foreignKey: "beneficiary_id" })
    }
  }
  attachment.init({
    urls: DataTypes.JSON,
    type: DataTypes.ENUM("certificate", "contact", "illness"),
    beneficiary_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'attachment',
  });
  return attachment;
};