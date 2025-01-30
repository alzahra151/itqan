const db = require('../models')
const apiError = require('../helpers/apiError')
const apiResponse = require('../helpers/apiResponser')

async function addBeneficiaryCategory(req, res, next) {
    console.log(req.body)
    const { title } = req.body
    try {
        const beneficiaryCate = await db.beneficiary_category.create({
            title
        })
        res.status(200).json(beneficiaryCate)
    } catch (error) {
        next(error)
    }
}
async function getBeneficiaryCategory(req, res, next) {
    try {
        const beneficiaryCates = await db.beneficiary_category.findAll()
        // return new apiResponse(res, { beneficiaryCates })
        res.status(200).json(beneficiaryCates)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    addBeneficiaryCategory,
    getBeneficiaryCategory
}