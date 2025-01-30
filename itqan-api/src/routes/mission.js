const { Router } = require("express");
const router = Router();
const { addMission, getEmployeeMission, getMissionById, updateMission, approveMissionProcedure, getCompletedMissions } = require('../controller/mission')
const { validateRequest } = require("../middlware's/validation")

router.route('/add').post(addMission)
router.route('/completed').get(getCompletedMissions)
router.route('/employee/:employee_id').get(getEmployeeMission)

router.route('/:id').get(getMissionById)
router.route('/:id').patch(updateMission)
router.route('/approve/:id').patch(approveMissionProcedure)

module.exports = router