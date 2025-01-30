const db = require('../models')
const apiError = require('../helpers/apiError')
const ApiResponser = require('../helpers/apiResponser')
const ApiError = require('../helpers/apiError')

async function getBenficiariesByEcictivePlanId(req, res, next) {
    const { executive_plan_id } = req.params
    try {
        const beneficiaries = await db.excutive_plan_benficiary.findAll({
            where: {
                executive_plan_id: executive_plan_id
            },
            include: [
                {
                    model: db.beneficiary,
                    as: "beneficiary",
                    include: [
                        {
                            model: db.contact_number,
                            as: "contact_numbers",

                        },
                        {
                            model: db.dependent,
                            as: "dependents"
                        },
                        {
                            model: db.illness,
                            as: "illnesse",

                        },
                        { model: db.attachment, as: "attachments" },
                        {
                            model: db.beneficiary_sevice, as: "beneficiary_sevices",

                            include: [
                                {
                                    model: db.service,
                                    as: "service"
                                }
                            ]
                        },
                        { model: db.close_person, as: "close_person" },
                        {
                            model: db.identity, as: "identity",


                        }
                    ]
                }
            ]
        })
        return new ApiResponser(res, { beneficiaries })
    } catch (error) {
        next(error)
    }
}

async function updateExectivePlanBebficiery(req, res, next) {
    const beneficiaryList = []
    // const transaction = await db.sequelize.transaction();
    const beneficiaries = req.body
    for (const beneficiry of beneficiaries) {
        console.log(beneficiry)
        const {
            id,
            type,
            beneficiary_id,
            executive_plan_id,
            service_done,
            note } = beneficiry
        try {
            const ExectivePlanBebficiery = await db.excutive_plan_benficiary.findByPk(id)
            if (!ExectivePlanBebficiery) throw new ApiError('not found')
            await ExectivePlanBebficiery.update({
                id,
                type,
                beneficiary_id,
                executive_plan_id,
                service_done,
                note
            })
            ExectivePlanBebficiery.save()
            beneficiaryList.push(ExectivePlanBebficiery)
         
        } catch (error) {
            next(error)
        }

    }
    return new ApiResponser(res, { beneficiaryList })
}
module.exports = {
    getBenficiariesByEcictivePlanId,
    
    updateExectivePlanBebficiery
}