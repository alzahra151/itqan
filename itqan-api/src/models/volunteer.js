'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class volunteer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      volunteer.belongsTo(models.association, { as: "association", foreignKey: "association_id" })
    }
  }
  volunteer.init({
    name: DataTypes.STRING,
    ID_number: DataTypes.STRING,
    mobile: DataTypes.STRING,
    email: DataTypes.STRING,
    image: DataTypes.STRING,
    attachments: DataTypes.JSON,
    volunteer_opportunity_name: DataTypes.STRING,
    volunteering_type: DataTypes.STRING,
    volunteering_nature: DataTypes.STRING,
    volunteering_place: DataTypes.STRING,
    volunteering_readiness: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    association_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'volunteer',
  });
  return volunteer;
};