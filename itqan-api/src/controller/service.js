const db = require('../models')
const apiError = require('../helpers/apiError')
const ApiResponser = require('../helpers/apiResponser')

async function addService(req, res, next) {
    // console.log(req.body)
    const serviceData = {
        name,
        description,
        association_id
    } = req.body
    console.log(req.body)
    try {
        const service = await db.service.create(serviceData)
        return new ApiResponser(res, { service })
    } catch (error) {
        next(error)
    }
}
async function getServices(req, res, next) {
    const { association_id } = req.params
    try {
        const services = await db.service.findAll({
            where: {
                association_id
            }
        })
        return new ApiResponser(res, { services })
        // res.status(200).json(employees)
    } catch (error) {
        next(error)
    }
}
async function updateService(req, res, next) {
    const { id } = req.params
    const updatedData = req.body
    try {
        const service = await db.service.findByPk(id)
        if (!service) throw new apiError('المستخدم غير موجود', 404)
        const updatedservice = await service.update(updatedData)
        service.save()
        return new ApiResponser(res, { updatedservice })
    } catch (error) {
        next(error)
    }
}
async function deleteService(req, res, next) {

    const { id } = req.params
    try {
        const service = await db.service.findByPk(id)
        if (!service) throw new ApiError('المستخدم غير موجود')
        await service.destroy();
        res.status(200).json('done')
    } catch (error) {
        next(error)
    }

}
module.exports = {
    addService,
    getServices,
    deleteService,
    updateService
}