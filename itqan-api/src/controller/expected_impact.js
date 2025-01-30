const db = require('../models')
const apiResponse = require('../helpers/apiResponser')


async function getExpected_impacties(req, res, next) {
    const { association_id } = req.params
    try {
        const expected_impacties = await db.expected_impact.findAll({
            where: {
                association_id
            }
        })
        // return new apiResponse(res, { expected_impacties })
        res.status(200).json({ result: expected_impacties })
    } catch (error) {
        next(error)
    }
}

async function addExpected_impact(req, res, next) {
    console.log(req.body)
    const expected_impactData = {
        title,
        description,
        association_id,
        target
    } = req.body
    console.log(expected_impactData)
    try {
        const expected_impact = await db.expected_impact.create(expected_impactData)
        // return new apiResponse(res, { expected_impact })
        res.status(200).json({ result: expected_impact })
    } catch (error) {
        next(error)
    }
}
module.exports = {
    getExpected_impacties,
    addExpected_impact
}