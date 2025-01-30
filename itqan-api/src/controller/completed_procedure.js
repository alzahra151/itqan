const db = require('../models')
const apiResponse = require('../helpers/apiResponser')
const ApiResponser = require('../helpers/apiResponser')

async function addCompletedProcedure(req, res, next) {
    console.log(req.body)
    const data = {
        date,
        number_value,
        description,
        procedure,
        mission_id
    } = req.body
    console.log(data)
    try {
        const completed_procedure = await db.completed_procedure.create(data)
        // return new apiResponse(res, { completed_procedure })
        res.status(200).json({ completed_procedure })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    addCompletedProcedure
}