const { Router } = require("express");
const router = Router();
const { getBenficiariesByEcictivePlanId, updateExectivePlanBebficiery } = require("../controller/exective_plane_beneficiary")
const { getBenficiaryEmplyessPlanId, updateExectivePlanBebficieryEmployees }=require("../controller/excutive_plan_emplyee_benficiary")

router.get("/beneficaries/:executive_plan_id", getBenficiariesByEcictivePlanId)
router.get("/employees/:executive_plan_id", getBenficiaryEmplyessPlanId)
router.patch("/beneficaries", updateExectivePlanBebficiery)
router.patch("/employees", updateExectivePlanBebficieryEmployees)


module.exports = router