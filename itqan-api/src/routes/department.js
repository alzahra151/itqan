
const { addDepartment, getDepartments, deleteDeparment, editDeparment, getById } = require('../controller/department')
const { Router } = require("express");
const router = Router();
const { departmentSchema } = require("../middlware's/validation/departmentValidation")
const { validateRequest } = require("../middlware's/validation")

router.route('/add_department').post(validateRequest(departmentSchema), addDepartment)
router.route('/delete/:id').delete(deleteDeparment)
router.route('/update/:id').patch(editDeparment)
router.route('/all/:association_id').get(getDepartments)

router.route('/:id').get(getById)
module.exports = router