'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class excutive_plan_director_board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      excutive_plan_director_board.belongsTo(models.executive_plan, { as: 'executive_plan', foreignKey: 'executive_plan_id' });
      excutive_plan_director_board.belongsTo(models.directors_board, { as: 'director_board', foreignKey: 'directors_board_id' });
    }
  }
  excutive_plan_director_board.init({
    executive_plan_id: DataTypes.INTEGER,
    directors_board_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'excutive_plan_director_board',
  });
  return excutive_plan_director_board;
};