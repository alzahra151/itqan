const { Router } = require("express");
const router = Router();
const { addExecutive_plan,
    getEcutivePlaneById, approveExectivePlan,
    getEmplyeeExcutivePlaneToArrprovel,
    getExcutivePlanByPhasedPlanId,
    updateExecutive_plan
} = require('../controller/executive_plan')
const { executive_planSchema } = require("../middlware's/validation/executive_planValidation")
const { validateRequest } = require("../middlware's/validation")

router.route('/add').post(addExecutive_plan)
router.route('/approve/:employee_id').get(getEmplyeeExcutivePlaneToArrprovel)
router.route('/:id').get(getEcutivePlaneById)
router.route('/phased_plan/:id').get(getExcutivePlanByPhasedPlanId)
router.route('/approve/:id').patch(approveExectivePlan)
router.route('/:id').patch(updateExecutive_plan)





module.exports = router