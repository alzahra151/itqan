const db = require('../models')
const apiError = require('../helpers/apiError')
const ApiResponser = require('../helpers/apiResponser')
const ApiError = require('../helpers/apiError')

async function getBenficiaryEmplyessPlanId(req, res, next) {
    const { executive_plan_id } = req.params
    try {
        const employees = await db.excutive_plan_employee_benficiary.findAll({
            where: {
                executiv_plan_id: executive_plan_id
            },
            include: [
                {
                    model: db.employee,
                    as: "employee",
                    include: [
                        {
                            model: db.department,
                            as: "department",

                        }
                    ]
                }
            ]
        })
        return new ApiResponser(res, { employees })
    } catch (error) {
        next(error)
    }
}
async function updateExectivePlanBebficieryEmployees(req, res, next) {
    const employeeList = []
    // const transaction = await db.sequelize.transaction();
    const employees = req.body
    // console.log(employees)
    for (const employee of employees) {
        console.log(employee)
        const {
            id,
            employee_id,
            executiv_plan_id,
            service_done,
            note } = employee
        try {
            const ExectivePlanBebficiery = await db.excutive_plan_employee_benficiary.findByPk(id)
            if (!ExectivePlanBebficiery) throw new ApiError('not found')
            await ExectivePlanBebficiery.update({
                id,
               
                employee_id,
                executiv_plan_id,
                service_done,
                note
            })
            ExectivePlanBebficiery.save()
            employeeList.push(ExectivePlanBebficiery)
           
        } catch (error) {
            next(error)
        }

    }
    return new ApiResponser(res, { employeeList })
}
module.exports = {
    getBenficiaryEmplyessPlanId,
    updateExectivePlanBebficieryEmployees
}