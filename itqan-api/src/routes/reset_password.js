const { resetPassword, verfiyOtp, changPassword } = require('../controller/reset_password')
const { Router } = require("express");
const router = Router();

router.post('/reset', resetPassword)
router.post('/verfiy', verfiyOtp)
router.post('/chang', changPassword)


module.exports = router