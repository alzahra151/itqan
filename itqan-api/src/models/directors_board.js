'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class directors_board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      directors_board.belongsTo(models.association, { as: "association", foreignKey: "association_id" })
      directors_board.hasMany(models.excutive_plan_director_board, { as: "executive_plans", foreignKey: "directors_board_id" });
    }
  }
  directors_board.init({
    name: DataTypes.STRING,
    ID_number: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.ENUM("ذكر", "انثى"),
    birth_date: DataTypes.DATE,
    mobile: DataTypes.STRING,
    email: DataTypes.STRING,
    image: DataTypes.STRING,
    attachments: DataTypes.JSON,
    joining_date: DataTypes.DATE,
    membership_type: DataTypes.ENUM("داعمة", "عادية"),
    employer: DataTypes.STRING,
    is_board_directores_member: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    is_founding_member: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    educational_level: DataTypes.STRING,
    joining_way: DataTypes.STRING,
    job: DataTypes.STRING,
    job_description: DataTypes.STRING,
    insurance_number: DataTypes.STRING,
    salary_support: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    association_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'directors_board',
  });
  return directors_board;
};