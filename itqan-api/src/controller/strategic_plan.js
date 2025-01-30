const db = require('../models')
const apiError = require('../helpers/apiError')
const apiResponse = require('../helpers/apiResponser')
const ApiError = require('../helpers/apiError')
const ApiResponser = require('../helpers/apiResponser')
const { format, addMonths, isBefore, isAfter } = require('date-fns');

async function addStratigicPlan(req, res, next) {

    try {
        console.log(req.body)
        let {
            name,
            start_date,
            end_date,
            introduction,
            goals,
            sub_goals,
            association_id
        } = req.body

        const result = await db.sequelize.transaction(async (transaction) => {
            const strategic_plan = await db.Strategic_plan.create({
                name,
                start_date,
                end_date,
                introduction,
                association_id
            },
                { transaction }
            );
            let planGoals = goals.map((goal) => ({
                ...goal,
                Strategic_plan_id: strategic_plan.id
            }))
            const createdGoals = await db.goal.bulkCreate(planGoals, {
                transaction
            })
            const goalIdMap = createdGoals.reduce((acc, goal) => {
                acc[goal.abbreviation] = goal.id;
                console.log(acc)
                return acc;
            }, {});
            const planSubGoals = sub_goals.map((subGoal) => ({
                ...subGoal,
                Strategic_plan_id: strategic_plan.id,
                goal_id: goalIdMap[subGoal.goal_abbreviation] || null, // Set goal_id to null if abbreviation doesn't exist
                // goal_abbreviation: undefined
            }));
            const createdSubGoals = await db.sub_goal.bulkCreate(planSubGoals, {
                transaction
            })
            return {
                strategic_plan,
                goals: createdGoals,
                sub_goals: createdSubGoals
            }
        })
        res.status(200).json(result)

    } catch (error) {
        next(error)
    }
}

async function getStratigicPlans(req, res, next) {
    const { association_id } = req.params
    try {
        const plans = await db.Strategic_plan.findAll(
            {
                where: {
                    association_id
                },
                include: [
                    {
                        model: db.goal,
                        as: "goals",
                    },
                    {
                        model: db.sub_goal,
                        as: "sub_goals",
                        include: [
                            {
                                model: db.goal,
                                as: "goal"
                            }
                        ]
                    },
                    {
                        model: db.phased_plan,
                        as: "phased_plans",
                    },
                ]
            }
        )
        // const plans = groupByMonth(data);
        // console.log(plans)
        return new apiResponse(res, { plans })
    } catch (error) {
        next(error)
    }
}
async function getStratigicPlanByID(req, res, next) {
    const { id } = req.params;
    try {
        const plans = await db.Strategic_plan.findAll(
            {
                where: {
                    id
                },
                include: [
                    {
                        model: db.goal,
                        as: "goals",


                    },
                    {
                        model: db.sub_goal,
                        as: "sub_goals",
                        include: [
                            {
                                model: db.goal,
                                as: "goal"
                            }
                        ]
                    },
                    {
                        model: db.phased_plan,
                        as: "phased_plans",
                    },

                ]
            }
        )
        return new apiResponse(res, { plan: plans[0] })
        // res.status(200).json(plans[0])
    } catch (error) {
        next(error)
    }
}

async function updatePlan(req, res, next) {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const result = await db.sequelize.transaction(async (transaction) => {
            // Find the existing strategic plan
            const strategicPlan = await db.Strategic_plan.findByPk(id, {
                include: [
                    { model: db.goal, as: "goals" },
                    { model: db.sub_goal, as: "sub_goals" }
                ]
            });

            if (!strategicPlan) throw new ApiError('الخطة الاستراتيجية غير موجودة');

            // Update the strategic plan fields
            await strategicPlan.update({
                name: updatedData.name,
                start_date: updatedData.start_date,
                end_date: updatedData.end_date,
                introduction: updatedData.introduction,
                association_id: updatedData.association_id
            }, { transaction });

            // Current goals and sub-goals in the database
            const currentGoals = strategicPlan.goals;
            const currentSubGoals = strategicPlan.sub_goals;

            // Map current goals and sub-goals by their IDs for easier lookup
            const currentGoalMap = currentGoals.reduce((acc, goal) => {
                acc[goal.id] = goal;
                return acc;
            }, {});
            const currentSubGoalMap = currentSubGoals.reduce((acc, subGoal) => {
                acc[subGoal.id] = subGoal;
                return acc;
            }, {});

            // Create a map of goal abbreviations to IDs (for linking sub-goals to goals)
            const goalIdMap = {};

            // Handle goals update, creation, and deletion
            const updatedGoals = await Promise.all(updatedData.goals.map(async (goal) => {
                if (goal.id && currentGoalMap[goal.id]) {
                    // Update existing goal
                    await db.goal.update(goal, { where: { id: goal.id }, transaction });
                    goalIdMap[goal.abbreviation] = goal.id;
                    return goal;
                } else {
                    // Create new goal
                    const newGoal = await db.goal.create({
                        ...goal,
                        Strategic_plan_id: strategicPlan.id
                    }, { transaction });
                    goalIdMap[newGoal.abbreviation] = newGoal.id;
                    return newGoal;
                }
            }));

            // Identify and delete goals that are no longer in the update data
            const updatedGoalIds = updatedData.goals.map(goal => goal.id).filter(id => id);
            const goalsToDelete = currentGoals.filter(goal => !updatedGoalIds.includes(goal.id));
            if (goalsToDelete.length > 0) {
                await db.goal.destroy({ where: { id: goalsToDelete.map(goal => goal.id) }, transaction });
            }

            // Handle sub-goals update, creation, and deletion
            await Promise.all(updatedData.sub_goals.map(async (subGoal) => {
                if (subGoal.id && currentSubGoalMap[subGoal.id]) {
                    // Update existing sub-goal
                    await db.sub_goal.update(subGoal, { where: { id: subGoal.id }, transaction });
                } else {
                    // Create new sub-goal
                    await db.sub_goal.create({
                        ...subGoal,
                        Strategic_plan_id: strategicPlan.id,
                        goal_id: goalIdMap[subGoal.goal_abbreviation] || null // Link to the appropriate goal or set to null
                    }, { transaction });
                }
            }));

            // Identify and delete sub-goals that are no longer in the update data
            const updatedSubGoalIds = updatedData.sub_goals.map(subGoal => subGoal.id).filter(id => id);
            const subGoalsToDelete = currentSubGoals.filter(subGoal => !updatedSubGoalIds.includes(subGoal.id));
            if (subGoalsToDelete.length > 0) {
                await db.sub_goal.destroy({ where: { id: subGoalsToDelete.map(subGoal => subGoal.id) }, transaction });
            }

            // Reload the updated strategic plan with its goals and sub-goals
            const updatedPlan = await db.Strategic_plan.findByPk(id, {
                include: [
                    { model: db.goal, as: 'goals' },
                    { model: db.sub_goal, as: 'sub_goals' }
                ]
            });

            return updatedPlan;
        });

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}
// Function to group by month and sort in ascending order


module.exports = {
    addStratigicPlan,
    getStratigicPlans,
    getStratigicPlanByID,
    updatePlan
}