const db = require('../models')
const apiResponse = require('../helpers/apiResponser')


async function getActivities(req, res, next) {
    const { association_id } = req.params
    try {
        const activities = await db.activity.findAll({
            where: {
                association_id
            }
        })
        return new apiResponse(res, { activities })
        // res.status(200).json({ result: activities })
    } catch (error) {
        next(error)
    }
}

async function addActitity(req, res, next) {
    console.log(req.body)
    const activityData = {
        name,
        description,
        association_id
    } = req.body
    try {
        const activity = await db.activity.create(activityData)
        return new apiResponse(res, { activity })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getActivities,
    addActitity
}