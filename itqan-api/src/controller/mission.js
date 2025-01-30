const db = require('../models')
const apiResponse = require('../helpers/apiResponser')
const ApiResponser = require('../helpers/apiResponser')
const { Op } = require('sequelize')

async function addMission(req, res, next) {
    const missionData = {
        name,
        start_date,
        end_date,
        number_value,
        evaluation_method,
        procedure,
        procedure_date,
        description,
        // status,
        reminder_date,
    } = req.body
    console.log(missionData)
    try {
        const mission = await db.mission.create(missionData)
        res.status(200).json(mission)
    } catch (error) {
        next(error)
    }
}
async function getEmployeeMission(req, res, next) {
    const { employee_id } = req.params
    const startOfToday = new Date();
   
    startOfToday.setHours(0, 0, 0, 0); // Set
    console.log(startOfToday)
    try {
        const missions = await db.mission.findAll({
            where: {
                employee_id,
                [Op.or]: [
                    { procedure: "approval" }, // Mission procedure is "approve"
                    {
                        "$executive_plan.approval$": true, // Approval in executive_plan is true
                    },
                ],
                reminder_date: {
                    [Op.lte]: startOfToday,
                },
                status: {
                    [Op.not]: "completed", // Status is not "completed"
                },

                // "$executive_plan.approval$": true,
                // Approval in executive_plan is true
            },
            include: [
                {
                    model: db.administration,
                    as: "administration"
                },
                {
                    model: db.employee,
                    as: "employee",
                },
                {
                    model: db.executive_plan,
                    as: "executive_plan",
                    include: [
                        {
                            model: db.sub_goal,
                            as: "sub_goal"
                        },
                    ]
                }
            ],
            // logging: console.log,
        })
        return new ApiResponser(res, { missions })
    } catch (error) {
        next(error)
    }
}
async function getMissionById(req, res, next) {
    const { id } = req.params
    try {
        const mission = await db.mission.findByPk(id, {

            include: [
                {
                    model: db.administration,
                    as: "administration"
                },
               
                {
                    model: db.employee,
                    as: "employee",
                },
                {
                    model: db.executive_plan,
                    as: "executive_plan",
                    include: [
                        {
                            model: db.excutive_plan_indicator, // Include the Activity model
                            as: 'indicators',
                            include: [
                                {
                                    model: db.indicator,
                                    as: 'indicator',
                                },
                            ],// Use the alias if it's defined in the model association

                        },
                        {
                            model: db.phased_plan,
                            as: "phased_plan",
                            include: [
                                {
                                    model: db.goal,
                                    as: 'goal',
                                },
                            ],//
                        },
                        {
                            model: db.excutive_plan_expected_impact, // Include the Activity model
                            as: 'expected_impacts',     // Use the alias if it's defined in the model association
                            include: [
                                {
                                    model: db.expected_impact,
                                    as: 'expected_impact',
                                },
                            ],
                        },
                        {
                            model: db.sub_goal,
                            as: "sub_goal"
                        },
                        {
                            model: db.mission,
                            as: "missions",
                            include: [
                                {
                                    model: db.employee,
                                    as:"employee"
                                   
                                },
                                {
                                    model: db.administration,
                                    as: "administration"

                                }
                            ]
                        },  
                        
                    ]
                    
                },
                {
                    model: db.completed_procedure,
                    as: "completed_procedures",
                },
            ],
        })
        return new ApiResponser(res, { mission })
    } catch (error) {
        next(error)
    }
}
async function updateMission(req, res, next) {
    const { id } = req.params
    const data = req.body
    try {
        const mission = await db.mission.findByPk(id)
        await mission.update(data, { new: true })
        return new ApiResponser(res, { mission })
    } catch (error) {
        next(error)
    }
}
async function approveMissionProcedure(req, res, next) {
    const { id } = req.params
    try {
        const mission = await db.mission.findByPk(id);

        if (!mission) throw new Error("Mission not found");

        // Update mission status
        await mission.update({ status: 'approved' });

        // Check if the plan should be approved
        const relatedPlan = await db.executive_plan.findByPk(mission.executive_plan_id);
        if (!relatedPlan) throw new Error("Plan not found");

        if (!relatedPlan.approval && mission.procedure === 'approval') {
            // Approve the plan
            await relatedPlan.update({ approval: true });
            console.log("Plan approved:", relatedPlan.id);
        }
        return new ApiResponser(res, { mission })
    } catch (error) {
        next(error)
    }
};
async function getCompletedMissions(req, res, next) {
    try {
        const missions = await db.mission.findAll({
            where: {
              
                status: "completed"

                // "$executive_plan.approval$": true,
                // Approval in executive_plan is true
            },
            include: [
                {
                    model: db.administration,
                    as: "administration"
                },
                {
                    model: db.employee,
                    as: "employee",
                },
                {
                    model: db.executive_plan,
                    as: "executive_plan",
                    include: [
                        {
                            model: db.excutive_plan_indicator, // Include the Activity model
                            as: 'indicators',     // Use the alias if it's defined in the model association

                        },
            
                    ]
                }
            ],
            // logging: console.log,
        })
        return new ApiResponser(res, { missions })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    addMission,
    getEmployeeMission,
    getMissionById,
    updateMission,
    approveMissionProcedure,
    getCompletedMissions
}