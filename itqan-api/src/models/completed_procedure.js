'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class completed_procedure extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      completed_procedure.belongsTo(models.mission, { as: "mission", foreignKey: "mission_id" });
    }
  }
  completed_procedure.init({
    date: DataTypes.DATE,
    number_value: DataTypes.STRING,
    description: DataTypes.STRING,
    procedure: DataTypes.STRING,
    mission_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'completed_procedure',
  });
  return completed_procedure;
};