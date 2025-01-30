const { Router } = require("express");
const router = Router();
const { addPhased_plan, getPhased_plans, getPhased_planById, getEmplyeePhased_planById, updatePhasedPlan } = require('../controller/phased_plan')
const { validateRequest } = require("../middlware's/validation")

router.route('/').get(getPhased_plans)
router.route('/add').post(addPhased_plan)
router.route('/:plan_id').get(getPhased_planById)
router.route('/:plan_id/employee/:employee_id').get(getEmplyeePhased_planById)
router.route('/:id').patch(updatePhasedPlan)



module.exports = router