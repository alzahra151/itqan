const { Router } = require("express");
const router = Router();
const { addStratigicPlan,
    getStratigicPlans,
    getStratigicPlanByID,
    updatePlan
} = require('../controller/strategic_plan')
const { validateRequest } = require("../middlware's/validation")


router.route('/add').post(addStratigicPlan)
router.route('/all/:association_id').get(getStratigicPlans)
router.route('/:id').get(getStratigicPlanByID)
router.route('/:id').patch(updatePlan)

module.exports = router