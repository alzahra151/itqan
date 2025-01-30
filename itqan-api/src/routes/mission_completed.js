const { addCompltedMissions } = require('../controller/mission_completed')
const { Router } = require("express");
const router = Router();

router.post('/add', addCompltedMissions)

module.exports = router