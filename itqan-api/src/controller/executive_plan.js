const db = require('../models')
const apiResponse = require('../helpers/apiResponser');
const ApiError = require('../helpers/apiError');
const ApiResponser = require('../helpers/apiResponser');
const { format, addMonths, isBefore, isAfter } = require('date-fns');
async function addExecutive_plan(req, res, next) {
    const executivePlansData = req.body;
    // console.log(executivePlansData)
    try {
        const executivePlansData = req.body;
        // console.log(executivePlansData)
        const result = await db.sequelize.transaction(async (transaction) => {
            const createdExecutivePlans = [];
            // executivePlansData
            let beneficeries;
            // for (const execPlanData of executivePlansData.executive_plans) {
            let {
                name,
                plan_name,
                main_goal,
                Requirements,
                expected_impacts,
                cost,
                sub_goal_id,
                description,
                repetition,
                automated_reports,
                follow_up,
                out_of_plan,
                activity_id,
                indicators,
                type,
                implementation_place,
                start_date,
                end_date,
                phased_plan_id,
                approval_employee_id,
                missions,
                repeat_type,
                repeat_until, // Optional end date for repetition
                repeat_interval, // e.g., repeat every '2' days or months
                is_original,
                reminder_date,
                beneficiaryList,
                beneficiaryemployeeList,
                BeneficiaryeDirectBoardMembers,
                completion_requires_beneficiaries,
                repetition_on_faild
            } = executivePlansData
            // console.log(beneficiaryemployeeList)
            const [activity, Strategic_plan] = await Promise.all([
                db.activity.findOne({ where: { id: activity_id } }),
                // db.beneficiary_category.findOne({ where: { id: beneficiary_cat_id } }),
                db.phased_plan.findOne({ where: { id: phased_plan_id } }),
            ]);
            // console.log(phased_plan_id)
            if (!activity | !Strategic_plan) {
                throw new ApiError({
                    activity_id: !activity ? 'العنصر غير موجود' : undefined,

                    phased_plan_id: !Strategic_plan ? 'العنصر غير موجود' : undefined,
                })
            }

            const executive_plan = await db.executive_plan.create({
                name,
                plan_name,
                main_goal,
                Requirements,
                // expected_impact,
                cost,
                sub_goal_id,
                description,
                repetition,
                automated_reports,
                follow_up,
                out_of_plan,
                activity_id,
                implementation_place,
                // indicator_id,
                type,
                start_date,
                end_date,
                phased_plan_id,
                approval_employee_id,
                repeat_type,
                repeat_until, // Optional end date for repetition
                repeat_interval, // e.g., repeat every '2' days or months
                is_original,
                reminder_date,
                completion_requires_beneficiaries,
                repetition_on_faild
            },
                { transaction }
            );
            let executivePlanMessions = missions.map((mission) => ({
                ...mission,
                executive_plan_id: executive_plan.id,
            }))

            let executivePlanBeneficairy = beneficiaryList.map((beneficiary) => ({
                beneficiary_id: beneficiary.id,
                executive_plan_id: executive_plan.id,
            }))
           
            let exectivePlanEmployeeBenficary = beneficiaryemployeeList.map((empolyee) => ({
                employee_id: empolyee.id,
                executiv_plan_id: executive_plan.id,
            }))
            let executivePlanIndicators = indicators.map((indicator) => ({
                indicator_id: indicator.id,
                executive_plan_id: executive_plan.id,
            }))
            let executivePlanExpectedImpcats = expected_impacts.map((expected_impact) => ({
                expected_impact_id: expected_impact.id,
                executive_plan_id: executive_plan.id,
            }))
            // console.log(executivePlanIndicators)
            const createdMissions = await db.mission.bulkCreate(executivePlanMessions, {
                transaction
            })
            const beneficiaries = await db.excutive_plan_benficiary.bulkCreate(executivePlanBeneficairy, {
                transaction
            })
            const employeesbeneficiariy = await db.excutive_plan_employee_benficiary.bulkCreate(exectivePlanEmployeeBenficary, {
                transaction
            })
            const planIndicators = await db.excutive_plan_indicator.bulkCreate(executivePlanIndicators, {
                transaction
            })
            const planExpectedImpcats = await db.excutive_plan_expected_impact.bulkCreate(executivePlanExpectedImpcats, {
                transaction
            })
           
                let executivePlanBeneficieryDirectorBoard = BeneficiaryeDirectBoardMembers.map((member) => ({
                    directors_board_id: member.id,
                    executive_plan_id: executive_plan.id,
                }))
                console.log(BeneficiaryeDirectBoardMembers)
               const beneficeriesboard= beneficiaryDirectorBoard = await db.excutive_plan_director_board.bulkCreate(executivePlanBeneficieryDirectorBoard, {
                    transaction
               })
            console.log(BeneficiaryeDirectBoardMembers)
            
            // createdExecutivePlan.push({
            //     executive_plan: executive_plan,
            //     missions: createdMissions,
            //     beneficiaries: beneficiaries,
            //     employeesbeneficiariy: employeesbeneficiariy
            // });
            // }
            return {
                executive_plan: executive_plan,
                missions: createdMissions,
                beneficiaries: beneficiaries,
                employeesbeneficiariy: employeesbeneficiariy,
                indicators: planIndicators,
                expectedImpcats: planExpectedImpcats,
                beneficiaryDirectorBoard: beneficeriesboard
            }
        })
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}
async function getEcutivePlaneById(req, res, next) {
    const { id } = req.params;
    try {

        const plan = await db.executive_plan.findByPk(id, {

            include: [
                {
                    model: db.activity,
                    as: "activity",

                },
                {
                    model: db.sub_goal, // Include the Activity model
                    as: 'sub_goal',     // Use the alias if it's defined in the model association

                },
                {
                    model: db.excutive_plan_indicator, // Include the Activity model
                    as: 'indicators',     // Use the alias if it's defined in the model association
                    include: [
                        {
                            model: db.indicator,
                            as:"indicator"
                        }
                    ]

                },
                {
                    model: db.excutive_plan_expected_impact, // Include the Activity model
                    as: 'expected_impacts',     // Use the alias if it's defined in the model association
                    include: [
                        {
                            model: db.expected_impact,
                            as: "expected_impact"
                        }
                    ]

                },
                {
                    model: db.phased_plan, // Include the Activity model
                    as: 'phased_plan',// Use the alias if it's defined in the model association
                    include: [
                        {
                            model: db.goal,
                            as:"goal"
                        }
                    ]

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
                },
                {
                    model: db.excutive_plan_director_board,
                    as: "directors_board",
                    include: [
                        {
                            model: db.directors_board,
                            as: "director_board",
                        }
                    ]
                }
            ]
        })
        // res.status(200).json(plans)
        return new ApiResponser(res, { plan })
    } catch (error) {
        next(error)
    }
}

async function getEmplyeeExcutivePlaneToArrprovel(req, res, next) {
    const { employee_id } = req.params
    try {
        const plans = await db.executive_plan.findAll({
            where: {
                approval_employee_id: employee_id
            }
        })
        return new ApiResponser(res, { plans })
    } catch (error) {
        next(error)
    }
}
async function approveExectivePlan(req, res, next) {

    try {
        const { id } = req.params
        const updateData = req.body
        const plan = await db.executive_plan.findByPk(id)
        if (plan) {
            const updatedPlan = await plan.update(updateData, { new: true })
            await plan.save()
            return new ApiResponser(res, { updatedPlan })
        } else {
            throw new ApiError("الخطة غير موجودة", 404)
        }

    } catch (error) {
        next(error)
    }
}
async function getExcutivePlanByPhasedPlanId(req, res, next) {
    try {
        const { id } = req.params
        const data = await db.executive_plan.findAll({
            where: {
                phased_plan_id: id,

            },
            include: [
                {
                    model: db.sub_goal, // Include the Activity model
                    as: 'sub_goal',     // Use the alias if it's defined in the model association

                },
                {
                    model: db.activity,
                    as: "activity",

                },
            ]
        })
        const plans = groupByMonth(data)
        // return new ApiResponser(res, { plans })
        res.status(200).json(plans)

    } catch (error) {
        next(error)
    }
}
async function updateExecutive_plan(req, res, next) {
    const { id } = req.params; // Assume executive plan ID is passed as a parameter
    const {
        name, plan_name, main_goal, Requirements, expected_impact, cost, sub_goal_id,
        description, repetition, automated_reports, follow_up, out_of_plan, activity_id,
        indicator_id, type, start_date, end_date, phased_plan_id, approval_employee_id,
        missions, beneficiaryList, beneficiaryemployeeList
    } = req.body;

    try {
        const result = await db.sequelize.transaction(async (transaction) => {
            // Fetch existing executive plan to ensure it exists
            const executive_plan = await db.executive_plan.findByPk(id, { transaction });
            if (!executive_plan) {
                throw new ApiError('Executive Plan not found', 404);
            }

            // Update main executive plan record
            await executive_plan.update({
                name, plan_name, main_goal, Requirements, expected_impact, cost,
                sub_goal_id, description, repetition, automated_reports, follow_up,
                out_of_plan, activity_id, indicator_id, type, start_date, end_date,
                phased_plan_id, approval_employee_id
            }, { transaction });

            // Missions Update: Bulk update existing or add new missions
            const currentMissions = await db.mission.findAll({
                where: { executive_plan_id: id },
                transaction,

            });
            const updatedMissionIds = missions.map(mission => mission.id).filter(id => id);

            // Step 3: Find missions to delete (those in the database but not in the incoming data)
            const missionsToDelete = currentMissions.filter(mission => !updatedMissionIds.includes(mission.id));

            if (missionsToDelete.length > 0) {
                await db.mission.destroy({
                    where: { id: missionsToDelete.map(mission => mission.id) },
                    transaction,
                });
            }
            const missionData = missions.map((mission) => ({
                ...mission,
                executive_plan_id: id,
            }));
            await db.mission.bulkCreate(missionData, {
                transaction,
                updateOnDuplicate: ['id', 'name', 'start_date', 'end_date', 'number_value', 'evaluation_method', 'procedure', 'procedure_date', 'description', 'employee_id', 'administration_id']
                // Add all other fields you want to update if they exist
            });

            // Beneficiaries Update: Delete old, then add new
            await db.excutive_plan_benficiary.destroy({ where: { executive_plan_id: id }, transaction });
            const beneficiaryData = beneficiaryList.map((beneficiary) => ({
                beneficiary_id: beneficiary.id,
                executive_plan_id: id,
            }));
            await db.excutive_plan_benficiary.bulkCreate(beneficiaryData, { transaction });

            // Employee Beneficiaries Update: Delete old, then add new
            await db.excutive_plan_employee_benficiary.destroy({ where: { executiv_plan_id: id }, transaction });
            const employeeBeneficiaryData = beneficiaryemployeeList.map((employee) => ({
                employee_id: employee.id,
                executiv_plan_id: id,
            }));
            await db.excutive_plan_employee_benficiary.bulkCreate(employeeBeneficiaryData, { transaction });

            return { executive_plan, missions: missionData, beneficiaries: beneficiaryData, employeesbeneficiariy: employeeBeneficiaryData };
        });

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

function groupByMonth(data) {
    // Group data by month
    const grouped = data.reduce((acc, item) => {
        const startDate = new Date(item.start_date);
        const endDate = new Date(item.end_date);

        // Iterate through months from startDate to endDate
        for (let d = startDate; isBefore(d, endDate) || d.getTime() === endDate.getTime(); d = addMonths(d, 1)) {
            const month = format(d, 'MMMM yyyy'); // Format the month as "Month Year"
            if (!acc[month]) {
                acc[month] = [];
            }
            acc[month].push(item);
        }

        return acc;
    }, {});

    // Define month ordering for sorting purposes
    const monthOrder = {
        January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
        July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
    };

    // Convert grouped object to an array of objects with `month` and `plans`
    const sortedArray = Object.entries(grouped)
        .sort((a, b) => {
            // Sort by year and then by month within each year
            const [monthA, yearA] = a[0].split(' ');
            const [monthB, yearB] = b[0].split(' ');

            if (yearA === yearB) {
                return monthOrder[monthA] - monthOrder[monthB];
            }
            return parseInt(yearA) - parseInt(yearB);
        })
        .map(([month, plans]) => ({ month, plans })); // Convert to desired format

    return sortedArray;
}

function successMission(){

}
module.exports = {
    addExecutive_plan,
    getEcutivePlaneById,
    approveExectivePlan,
    getEmplyeeExcutivePlaneToArrprovel,
    getExcutivePlanByPhasedPlanId,
    updateExecutive_plan
}