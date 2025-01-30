'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      role.hasMany(models.employee, { foreignKey: "role_id" });
      role.belongsTo(models.association, { as: "association", foreignKey: "association_id" })

    }
  }
  role.init({
    name: DataTypes.STRING,
    permissions: {
      type: DataTypes.JSON,
      defaultValue: [],
    }
  }, {
    sequelize,
    modelName: 'role',
  });
  return role;
};