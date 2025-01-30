const db = require('../models')
const apiResponse = require('../helpers/apiResponser')
const ApiResponser = require('../helpers/apiResponser')
const ApiError = require('../helpers/apiError')
// const { where } = require('sequelize')

//get sub goals by goal id 
async function getSub_goalByGoalId(req, res, next) {
    try {
        const { goal_id } = req.params
        const sub_goals = await db.sub_goal.findAll({
            where: {
                goal_id
            }
        })
        return new apiResponse(res, { sub_goals })
    } catch (error) {
        next(error)
    }
}
async function getSub_goalById(req, res, next) {
    try {
        const { id } = req.params
        const sub_goal = await db.sub_goal.findByPk(id)
        if (!sub_goal) throw new ApiError(' الهدف غير موجود')
        return new ApiResponser(res, { sub_goal })
    } catch (error) {
        next(error)
    }
}
module.exports = {
    getSub_goalByGoalId,
    getSub_goalById
}