const { Router } = require("express");
const router = Router();
const {
    getIndicatories,
    addIndicator,
    updateIndicator,
    deleteIndicator
} = require('../controller/indicator')
const { validateRequest } = require("../middlware's/validation")

router.route('/all/:association_id').get(getIndicatories)
router.route('/add').post(addIndicator)
router.patch('/:id', updateIndicator)
router.delete('/:id', deleteIndicator)

module.exports = router