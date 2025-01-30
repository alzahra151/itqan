const { Router } = require("express");
const router = Router();
const { addAssociation, getAssociation } = require('../controller/association')
const upload = require("../controller/multer");
const { schema } = require("../middlware's/validation/associationValidator")
const { validateRequest } = require("../middlware's/validation")

router.route('/add').post(upload.single("image"), validateRequest(schema), addAssociation)
router.route('/:id').get(getAssociation)


module.exports = router