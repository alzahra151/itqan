const { Router } = require("express");
const router = Router();
const {
    getExpected_impacties,
    addExpected_impact
} = require('../controller/expected_impact')
const { validateRequest } = require("../middlware's/validation")

router.get('/all/:association_id',getExpected_impacties)
router.route('/add').post(addExpected_impact)


module.exports = router