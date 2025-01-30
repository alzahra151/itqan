const ApiResponser = require('../helpers/apiResponser')
const db = require('../models')

async function addCompltedMissions(req, res, next) {
    try {
        const exectivePlans = req.body
        let createdCpmpletedMissions = []
        for (const execPlanData of exectivePlans.executive_plans) {
            let { completedMissions } = execPlanData
            const addcompletedMissions = await db.mission_completed.bulkCreate(completedMissions)
            createdCpmpletedMissions.push({
                completedMission: addcompletedMissions
            })
        }
        return new ApiResponser(res, { createdCpmpletedMissions })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    addCompltedMissions
}