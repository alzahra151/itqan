const { Router } = require("express");
const router = Router();
const { getSub_goalByGoalId,
    getSub_goalById } = require("../controller/sub_goal")

router.get('/goal/:goal_id', getSub_goalByGoalId)
router.get('/:id', getSub_goalById)

module.exports = router

