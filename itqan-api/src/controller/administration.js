const db = require('../models')
const apiError = require('../helpers/apiError')
const apiResponse = require('../helpers/apiResponser')
const ApiResponser = require('../helpers/apiResponser')

async function addAdministration(req, res, next) {
    console.log(req.body)
    const associationData = { name, association_id } = req.body
    try {
        const association = await db.administration.create(associationData)
        res.status(200).json(association)
    } catch (error) {
        next(error)
    }
}
async function getAdminstrations(req, res, next) {
    const { association_id } = req.params
    try {
        const adminstrations = await db.administration.findAll({
            where: {
                association_id
            },
            include: [
                {
                    model: db.department,
                    as: "departments",
                },
            ]
        })
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        // return new apiResponse(res, { adminstrations })
        res.status(200).json(adminstrations)

    } catch (error) {
        next(error)
    }
}
async function deletAdmistration(req, res, next) {
    const { id } = req.params
    try {
        const Admistration = await db.administration.findByPk(id)
        // const { count, rows } = await db.employee.findAndCountAll({ where: { department_id: department.id } });
        // console.log(count)
        // if (count > 0) {
        //     throw new Error('لا يمكن حذف القسم لارتباطه بعناصر اخري');
        // }
        await Admistration.destroy();
        res.status(200).json('done')
    } catch (error) {
        next(error)
    }
}
async function editAdminstration(req, res, next) {
    const { id } = req.params
    const updatedData = req.body
    console.log(updatedData)
    try {
        const administration = await db.administration.findByPk(id)
        const updated = await administration.update(updatedData)
        await updated.save();
        return new ApiResponser(res, { updated })
    } catch (error) {
        next(error)
    }
}
async function deleteall(req, res) {
    try {
        await db.administration.destroy({
            where: {
                id: 1
            }
        });
        console.log('All data deleted successfully');
        res.json('done')
    } catch (err) {
        console.error('Error deleting data:', err);
        res.json('fail')
    }
}

module.exports = {
    addAdministration,
    getAdminstrations,
    deleteall,
    deletAdmistration,
    editAdminstration
}