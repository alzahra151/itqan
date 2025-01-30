'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stakeholder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      stakeholder.belongsTo(models.association, { as: "association", foreignKey: "association_id" })

    }
  }
  stakeholder.init({
    name: DataTypes.STRING,
    mobile: DataTypes.STRING,
    email: DataTypes.STRING,
    web_site: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'stakeholder',
  });
  return stakeholder;
};