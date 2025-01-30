const { Router } = require("express");
const router = Router();
const {
    getActivities,
    addActitity
} = require('../controller/activity')
const { validateRequest } = require("../middlware's/validation")

router.route('/all/:association_id').get(getActivities)
router.route('/add').post(addActitity)

module.exports = router