

const { Router } = require("express");
const router = Router();
const { addBeneficiaryCategory, getBeneficiaryCategory } = require('../controller/beneficiary_category')
const { validateRequest } = require("../middlware's/validation")

router.route('/add').post(addBeneficiaryCategory)
router.route('/').get(getBeneficiaryCategory)

module.exports = router