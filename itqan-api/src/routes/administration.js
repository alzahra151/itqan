const { Router } = require("express");
const router = Router();
const { addAdministration,
    getAdminstrations, deleteall, deletAdmistration, editAdminstration
} = require('../controller/administration')
const { administrationSchema } = require("../middlware's/validation/administrationValidation")
const { validateRequest } = require("../middlware's/validation")

router.route('/add').post(validateRequest(administrationSchema), addAdministration)
router.route('/all/:association_id').get(getAdminstrations)
router.route('/:id').delete(deletAdmistration)
router.route('/:id').patch(editAdminstration)


module.exports = router