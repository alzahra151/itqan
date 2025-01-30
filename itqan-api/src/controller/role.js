const ApiError = require('../helpers/apiError')
const ApiResponser = require('../helpers/apiResponser')
const db = require('../models')

async function getRoleByTd(req, res, next) {
    const { id } = req.params
    try {
        // await db.role.create({
        //     "name": "admin"
        // })
        const role = await db.role.findByPk(id)
        if (!role) throw new ApiError('صلاحية المستحدم غير موجودة')
        return new ApiResponser(res, { role })
    } catch (error) {
        next(error)
    }
}
async function getRoles(req, res, next) {

    try {
        const roles = await db.role.findAll()
        return new ApiResponser(res, { roles })
    } catch (error) {
        next(error)
    }
}
module.exports = {
    getRoleByTd,
    getRoles
}