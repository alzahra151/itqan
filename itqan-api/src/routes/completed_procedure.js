const { Router } = require("express");
const router = Router();
const {
    addCompletedProcedure
} = require('../controller/completed_procedure')
const { validateRequest } = require("../middlware's/validation")

// router.route('/all/:association_id').get(getIndicatories)
router.route('/add').post(addCompletedProcedure)
// router.patch('/:id', updateIndicator)
// router.delete('/:id', deleteIndicator)

module.exports = router