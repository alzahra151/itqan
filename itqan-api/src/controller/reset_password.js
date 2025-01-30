const ApiError = require('../helpers/apiError')
const db = require('../models')
const sendEmail = require("../controller/send_email");
const ApiResponser = require('../helpers/apiResponser');
const bcrypt = require('bcrypt')
async function resetPassword(req, res, next) {
    const { email } = req.body
    try {
        if (!email) throw new ApiError("يجب ارسال الايميل ", 404)
        const employee = await db.employee.findOne({ where: { email } })
        if (!employee) throw new ApiError("الايميل غير مسجل", 404)
        const otp = Math.floor(1000 + Math.random() * 9000);
        const otpExpier = new Date();
        console.log(otpExpier)
        otpExpier.setMinutes(otpExpier.getMinutes() + 5);
        console.log(otpExpier)
        await employee.update({ otp, otpExpier })
        employee.save()
        await sendEmail(employee.email, "اعادة تعيين كلمة المرور",
            `
         <div dir="rtl" style="border: 1px solid #ddd; padding: 10px; max-width: 600px; margin: auto;">
         <p> الكود الخاص باعادة تعيين كلمة المرور هو :</p>
            <h2 style="color:#1E429F"> <ins>${otp} </ins></h2>
        </div>`);
        return new ApiResponser(res, "تم ارسال الكود الي الايميل ")
    } catch (error) {
        next(error)
    }
}
async function verfiyOtp(req, res, next) {
    const { otp, email } = req.body
    try {
        const verfiyOpt = await db.employee.findOne({
            where: {
                email,
                otp,
            }
        })
        if (verfiyOpt) {
            const currentTimestamp = new Date();
            console.log(currentTimestamp, verfiyOpt.otpExpier)
            if (currentTimestamp < verfiyOpt.otpExpier) {
                return new ApiResponser(res, "تم تاكيد الكود")
            } else {
                throw new ApiError("تم انتهاء صلاحية الكود", 404)
            }
        } else {
            throw new ApiError(" الكود غير صالح")
        }

    } catch (error) {
        next(error)
    }
}
async function changPassword(req, res, next) {
    const { password, email } = req.body
    try {
        const updatedEmployee = await db.employee.findOne({ where: { email } })
        if (!updatedEmployee) throw new ApiError("الموظف غير موجود")
        await updatedEmployee.update({ password, otp: null, otpExpier: null }, { new: true })
        updatedEmployee.save()

        return new ApiResponser(res, updatedEmployee)
    } catch (error) {
        next(error)
    }
}
module.exports = {
    resetPassword,
    verfiyOtp,
    changPassword
}