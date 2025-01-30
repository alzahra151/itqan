const { Router } = require("express");
const router = Router();
const { getRoleByTd, getRoles } = require("../controller/role")

router.get('/:id', getRoleByTd)
router.get('/', getRoles)

module.exports = router