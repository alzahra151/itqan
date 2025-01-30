const { Router } = require("express");
const router = Router();
const { getEmployees, addemployee, login, getEmployeeByTd, updateEmolyee, deleteEmployee } = require('../controller/employee')
const upload = require("../controller/multer");

const { validateRequest } = require("../middlware's/validation")

router.route('/add').post(upload.single("image"), addemployee)
router.route('/login').post(login)
router.route('/:id').get(getEmployeeByTd)
router.route('/all/:association_id').get(getEmployees)
router.route('/:id').patch(upload.single("image"), updateEmolyee)
router.route('/:id').delete(deleteEmployee)



module.exports = router