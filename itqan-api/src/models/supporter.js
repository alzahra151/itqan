'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class supporter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      supporter.belongsTo(models.association, { as: "association", foreignKey: "association_id" })
    }
  }
  supporter.init({
    name: DataTypes.STRING,
    ID_number: DataTypes.STRING,
    mobile: DataTypes.STRING,
    email: DataTypes.STRING,
    image: DataTypes.STRING,
    attachments: DataTypes.JSON,
    entity_name: DataTypes.STRING,
    city: DataTypes.STRING,
    donation_type: DataTypes.STRING,
    donation_way: DataTypes.STRING,
    donate_periodically: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    repeat_donation: DataTypes.STRING,
    end_date: DataTypes.DATE,
    association_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'supporter',
  });
  return supporter;
};