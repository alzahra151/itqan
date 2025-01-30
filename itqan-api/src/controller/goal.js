
const db = require('../models')
const apiError = require('../helpers/apiError')
const ApiResponser = require('../helpers/apiResponser')

async function getGoalByTd(req, res, next) {
    const { id } = req.params
    try {
        const goal = await db.goal.findByPk(id, {
            include: [
                {
                    model: db.department,
                    as: "department",
                },
            ],
            attributes: {
                exclude: ["password"],
            },
        })
        if (!employee) throw new ApiError('المستخدم غير موجودw')
        return new ApiResponser(res, { employee })

    } catch (error) {
        next(error)
    }
}

module.exports = {
    
}