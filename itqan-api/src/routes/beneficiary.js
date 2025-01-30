const { Router } = require("express");
const router = Router();
const { addBeneficiary, getBeneficaries, deleteBeneficiary, getBeneficiaryByTd } = require('../controller/beneficiary')

router.post('/add', addBeneficiary)
// router.post('/addDomy', addDomy)

router.get('/all/:association_id', getBeneficaries)
router.route('/:id').delete(deleteBeneficiary)
router.route('/:id').get(getBeneficiaryByTd)
module.exports = router