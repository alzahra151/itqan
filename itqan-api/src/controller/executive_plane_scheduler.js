const cron = require('node-cron');
const db = require('../models');
const { Op } = require('sequelize');
const moment = require('moment');

const scheduleMissionRepeats = () => {
    cron.schedule('* * * * *', async () => { // runs at midnight every day
        const now = moment();
        console.log("test")
        try {
            const originalPlans = await db.executive_plan.findAll({
                where: {
                    is_original: true,
                    repeat_type: { [Op.not]: 'none' },
                    repeat_until: { [Op.gte]: now.toISOString() },
                },
                include: [
                    { model: db.mission, as: 'missions' },
                    { model: db.excutive_plan_benficiary, as: 'beneficiaries' },
                    { model: db.excutive_plan_employee_benficiary, as: 'employeesbeneficiary' },
                    { model: db.excutive_plan_indicator, as: 'indicators' },
                ],
            });
            console.log(originalPlans)


            for (const plan of originalPlans) {
                const transaction = await db.sequelize.transaction();
                console.log(plan)
                try {
                    const lastCreatedDate = moment(plan.last_created_date || plan.start_date);
                    const nextDate = calculateNextDate({ ...plan.toJSON(), start_date: lastCreatedDate });
                    console.log(nextDate)
                    if (nextDate && nextDate.startOf('day').isSame(now.startOf('day'))) {
                        // Create repeated plan
                        const newPlan = await db.executive_plan.create({
                            ...plan.toJSON(),
                            id: undefined,
                            is_original: false,
                            createdAt: undefined,
                            updatedAt: undefined,
                            start_date: nextDate.toISOString(),
                            end_date: moment(nextDate)
                                .add(moment(plan.end_date).diff(moment(plan.start_date), 'days'), 'days')
                                .toISOString(),
                            original_plan_id: plan.id,
                        }, { transaction });
                        console.log(plan.toJSON().missions)
                        // Map and create related records
                        const executivePlanMissions = plan.toJSON().missions.map((mission) => ({
                            ...mission,
                            id: undefined,
                            status: mission.procedure == "approval" ? "approved" : "pending",
                            executive_plan_id: newPlan.id,
                            start_date: moment(nextDate)
                                .add(moment(mission.start_date).diff(moment(plan.start_date), 'days'), 'days')
                                .toISOString(),
                            end_date: moment(nextDate)
                                .add(moment(mission.end_date).diff(moment(plan.start_date), 'days'), 'days')
                                .toISOString(),
                            reminder_date: moment(nextDate)
                                .add(moment(mission.reminder_date).diff(moment(plan.start_date), 'days'), 'days')
                                .toISOString(),
                        }));

                        const executivePlanBeneficiaries = plan.toJSON().beneficiaries.map((beneficiary) => ({
                            beneficiary_id: beneficiary.beneficiary_id,
                            executive_plan_id: newPlan.id,
                        }));

                        const executivePlanEmployeeBeneficiaries = plan.toJSON().employeesbeneficiary.map((employee) => ({
                            employee_id: employee.employee_id,
                            executive_plan_id: newPlan.id,
                        }));

                        const executivePlanIndicators = plan.toJSON().indicators.map((indicator) => ({
                            indicator_id: indicator.indicator_id,
                            executive_plan_id: newPlan.id,
                        }));

                        // Bulk create related records
                        await db.mission.bulkCreate(executivePlanMissions, { transaction });
                        await db.excutive_plan_benficiary.bulkCreate(executivePlanBeneficiaries, { transaction });
                        await db.excutive_plan_employee_benficiary.bulkCreate(executivePlanEmployeeBeneficiaries, { transaction });
                        await db.excutive_plan_indicator.bulkCreate(executivePlanIndicators, { transaction });

                        // Update last_created_date
                        await plan.update({ last_created_date: nextDate.toISOString() }, { transaction });

                        // Commit the transaction
                        await transaction.commit();
                        console.log(`Repeated plan created for ${newPlan}`);
                    }
                } catch (error) {
                    console.error('Error scheduling repeated mission:', error);
                    await transaction.rollback();
                }
            }
        } catch (error) {
            console.log(error)
        }
    });
};

function calculateNextDate(plan) {
    const startDate = moment(plan.start_date);
    if (plan.repeat_type === 'daily') {
        return startDate.add(plan.repeat_interval || 1, 'days');
    }
    if (plan.repeat_type === 'weekly') {
        return startDate.add(plan.repeat_interval || 1, 'weeks');
    }
    if (plan.repeat_type === 'monthly') {
        return startDate.add(plan.repeat_interval || 1, 'months');
    }
    return null;
}

module.exports = { scheduleMissionRepeats };
