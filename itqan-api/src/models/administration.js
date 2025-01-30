'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class administration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      administration.hasMany(models.department, { as: "departments", foreignKey: "administration_id" }, { onDelete: "RESTRICT" });
      administration.hasMany(models.mission, { as: "missions", foreignKey: "administration_id" }, { onDelete: "RESTRICT" });
      administration.hasMany(models.mission_completed, { as: "completed_missions", foreignKey: "administration_id" }, { onDelete: "RESTRICT" });
      administration.belongsTo(models.association, { as: "association", foreignKey: "association_id" })

      // administration.belongsTo(models.mission, { as: "mission", foreignKey: "mission_id" })
    }
  }
  administration.init({
    name: DataTypes.STRING,
    association_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'administration',
  });
  return administration;
};