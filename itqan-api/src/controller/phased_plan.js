const db = require('../models')
const apiResponse = require('../helpers/apiResponser')
const { where, Op } = require('sequelize')
const ApiResponser = require('../helpers/apiResponser')
const ApiError = require('../helpers/apiError')

async function addPhased_plan(req, res, next) {
    console.log(req.body)
    try {
        const result = await db.sequelize.transaction(async (transaction) => {
            const phased_planData = {
                title,
                description,
                goal_id,
                start_date,
                end_date,
                subGoals,
                Strategic_plan_id
            } = req.body

            const phased_plan = await db.phased_plan.create({
                title,
                description,
                goal_id,
                start_date,
                end_date,
                Strategic_plan_id
            }, { transaction })
            let sub_goals = subGoals.map((subGoal) => ({
                phased_plan_id: phased_plan.id,
                sub_goal_id: subGoal.id,
            }))
            // console.log(executivePlanIndicators)
            const createdSubGoals = await db.phased_plan_sub_goal.bulkCreate(sub_goals, {
                transaction
            })
            return {
                phased_plan: phased_plan ,
                subGoals: createdSubGoals,
            }
        })

        return new apiResponse(res, { result })
    } catch (error) {
        next(error)
    }
}
async function getPhased_plans(req, res, next) {
    try {
        const phased_plans = await db.phased_plan.findAll()
        return new apiResponse(res, { phased_plans })
        // res.status(200).json({ result: activities })
    } catch (error) {
        next(error)
    }
}
async function getPhased_planById(req, res, next) {
    const { plan_id } = req.params
    try {
        const phased_plan = await db.phased_plan.findByPk(plan_id,
            {
                include: [
                    {
                        model: db.goal,
                        as: 'goal',
                        include: [
                            {
                                model: db.sub_goal,
                                as: "sub_goals"
                            },
                        ],
                    },
                    {
                        model: db.phased_plan_sub_goal,
                        as: "sub_goals",
                        include: [
                            {
                                model: db.sub_goal,
                                as:'sub_goal'
                           }
                        ]
                    },
                    {
                        model: db.Strategic_plan,
                        as: 'Strategic_plan',
                    },
                    {
                        model: db.executive_plan,
                        as: 'executive_plans',
                        include: [
                            {
                                model: db.activity,
                                as: "activity",
                            },
                            {
                                model: db.mission,
                                as: "missions",
                                include: [
                                    {
                                        model: db.administration,
                                        as: "administration"
                                    },
                                    {
                                        model: db.employee,
                                        as: "employee"
                                    }
                                ]
                            },
                            {
                                model: db.mission_completed,
                                as: "completed_missions",
                                include: [
                                    {
                                        model: db.employee,
                                        as: "employee"
                                    }
                                ]
                            },
                            {
                                model: db.excutive_plan_benficiary,
                                as: "beneficiaries",
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
                            },
                            {
                                model: db.excutive_plan_employee_benficiary,
                                as: "employeesbeneficiary",
                                include: [
                                    {
                                        model: db.employee,
                                        as: "employee",
                                        include: [
                                            {
                                                model: db.department,
                                                as: "department"
                                            },

                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ],
            }
        )


        return new apiResponse(res, { phased_plan })
    } catch (error) {
        next(error)
    }
}
async function getEmplyeePhased_planById(req, res, next) {
    const { plan_id, employee_id } = req.params
    try {
        const phased_plan = await db.phased_plan.findByPk(plan_id,
            {
                include: [
                    {
                        model: db.goal,
                        as: 'goal',
                        include: [
                            {
                                model: db.sub_goal,
                                as: "sub_goals"
                            },
                        ],
                    },
                    {
                        model: db.Strategic_plan,
                        as: 'Strategic_plan',
                    },
                    {
                        model: db.executive_plan,
                        as: 'executive_plans',
                        where: {
                            [Op.or]: [
                                { approval: true },
                                { approval: false, approval_employee_id: employee_id }
                            ],
                        },
                        include: [
                            {
                                model: db.activity,
                                as: "activity",
                            },
                            {
                                model: db.mission,
                                as: "missions",

                                include: [
                                    {
                                        model: db.administration,
                                        as: "administration"
                                    },
                                    {
                                        model: db.employee,
                                        as: "employee",
                                        where: {
                                            id: employee_id,
                                        }
                                    }
                                ],
                                required: false
                            },
                            {
                                model: db.mission_completed,
                                as: "completed_missions",
                                include: [
                                    {
                                        model: db.employee,
                                        as: "employee",
                                        where: {
                                            id: employee_id,
                                        }
                                    }
                                ],
                                required: false
                            },
                            {
                                model: db.excutive_plan_benficiary,
                                as: "beneficiaries",
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
                                    },
                                ]
                            },
                            {
                                model: db.excutive_plan_employee_benficiary,
                                as: "employeesbeneficiary",
                                include: [
                                    {
                                        model: db.employee,
                                        as: "employee"
                                    }
                                ]
                            }
                        ],
                        required: false
                    },

                ],
            }
        )
        return new apiResponse(res, { phased_plan })
    } catch (error) {
        next(error)
    }
}

async function updatePhasedPlan(req, res, next) {
    const { id } = req.params
    const updatedData = req.body
    try {
        const phased_plan = await db.phased_plan.findByPk(id)
        if (!phased_plan) throw new ApiError('المستخدم غير موجود')
        const updatedPhased_plan = await phased_plan.update(updatedData)
        phased_plan.save()
        return new ApiResponser(res, { updatedPhased_plan })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    addPhased_plan,
    getPhased_plans,
    getPhased_planById,
    getEmplyeePhased_planById,
    updatePhasedPlan
}