const db = require('../models')
const apiResponse = require('../helpers/apiResponser')
const ApiResponser = require('../helpers/apiResponser')


async function getIndicatories(req, res, next) {
    const { association_id } = req.params
    try {
        const indicatories = await db.indicator.findAll({
            where: {
                association_id
            }
        })
        return new apiResponse(res, { indicatories })
        // res.status(200).json({ result: activities })
    } catch (error) {
        next(error)
    }
}

async function addIndicator(req, res, next) {
    console.log(req.body)
    const idicatorData = {
        title,
        description,
        association_id,
        target
    } = req.body
    console.log(idicatorData)
    try {
        const indicator = await db.indicator.create(idicatorData)
        return new apiResponse(res, { indicator })
    } catch (error) {
        next(error)
    }
}
async function updateIndicator(req, res, next) {
    const { id } = req.params
    const updatedData = req.body
    try {
        const indicator = await db.indicator.findByPk(id)
        if (!indicator) throw new apiError('المؤشر غير موجود', 404)
        const updatedservice = await indicator.update(updatedData)
        indicator.save()
        return new ApiResponser(res, { updatedservice })
    } catch (error) {
        next(error)
    }
}
async function deleteIndicator(req, res, next) {

    const { id } = req.params
    try {
        const indicator = await db.indicator.findByPk(id)
        if (!indicator) throw new ApiError('المستخدم غير موجود')
        await indicator.destroy();
        res.status(200).json('done')
    } catch (error) {
        next(error)
    }

}
module.exports = {
    getIndicatories,
    addIndicator,
    updateIndicator,
    deleteIndicator
}