const db = require('../models')
const ApiError = require("../helpers/apiError")
const { compareSync } = require("bcrypt")
const jwt = require("jsonwebtoken")
const ApiResponser = require('../helpers/apiResponser')
const { Op } = require('sequelize')
const cloudinary = require('./cloudinary')
async function addemployee(req, res, next) {
    const {
        name,
        job_number,
        ID_number,
        address,
        gender,
        birth_date,
        mobile,
        department_id,
        role_id,
        password,
        association_id,
        email,
        user_name,
        active_on_system
    } = req.body
    const employeeData = {
        name,
        job_number,
        ID_number,
        address,
        gender,
        birth_date,
        mobile,
        department_id,
        role_id,
        password,
        association_id,
        email,
        user_name,
        active_on_system
    }
    console.log(req.body)
    try {
        // console.log(`${req.protocol}://${req.get('host')}/uploads/images`)
        // if (req.file) employeeData.image = `${req.protocol}://${req.get('host')}/uploads/images/${req.file.filename}`
        if (req.file) {
            const Image = await cloudinary.uploader.upload(req.file.path)
            employeeData.image = Image.secure_url
            console.log(employeeData)
        }
        console.log(employeeData)
        const employee = await db.employee.create(employeeData)
        res.status(200).json(employee)
    } catch (error) {
        next(error)
    }
}
async function getEmployees(req, res, next) {
    const { association_id } = req.params
    try {
        const { name,
            gender,
            department_id,
            // minAge,
            // maxAge
        } = req.query;
        console.log(req.query)
        let where = {
            association_id
        };
        if (name) {
            where.name = { [Op.like]: `%${name}%` };
        }
        if (gender) {
            where.gender = { [Op.like]: `%${gender}%` };
        }
        if (department_id) {
            where.department_id = department_id;
        }

        console.log(where)
        const employees = await db.employee.findAll({
            where,
            include: [
                {
                    model: db.department,
                    as: "department",
                },
            ],
            attributes: {
                exclude: ["password"],
            },
        })
        return new ApiResponser(res, { employees })
        // res.status(200).json(employees)
    } catch (error) {
        next(error)
    }
}
async function login(req, res, next) {
    const { email, password } = req.body
    console.log(req.body)
    try {
        const employee = await db.employee.findOne({ where: { email: email } })
        if (!employee) {
            throw new ApiError('الايميل غير صحيح', 401)
        } else {
            console.log(employee)
            
            const verfiypassword = await compareSync(password, employee.password)
            console.log(verfiypassword)
            if (!verfiypassword) {
                throw new ApiError('كلمة المرور غير صحيحة', 401)
            } else {
                const token = jwt.sign({ id: employee.id, role_id: employee.role_id }
                    , `${process.env.JWT_SECRET_KEY}`,
                    {
                        expiresIn: "90d"
                    })
                return new ApiResponser(res, { token })
            }
        }
    } catch (err) {
        next(err)
    }
}
async function getEmployeeByTd(req, res, next) {
    const { id } = req.params
    try {
        const employee = await db.employee.findByPk(id, {
            include: [
                {
                    model: db.department,
                    as: "department",
                },
            ],
            attributes: {
                exclude: ["password"],
            },
        })
        if (!employee) throw new ApiError('المستخدم غير موجودw')
        return new ApiResponser(res, { employee })

    } catch (error) {
        next(error)
    }
}
async function updateEmolyee(req, res, next) {
    const { id } = req.params
    const updatedData = req.body
    try {
        const employee = await db.employee.findByPk(id)
        if (!employee) throw new ApiError('المستخدم غير موجود')
        if (req.file) {
            const Image = await cloudinary.uploader.upload(req.file.path)
            updatedData.image = Image.secure_url
            console.log(updatedData)
        }
        const updatedEmployee = await employee.update(updatedData)
        employee.save()
        return new ApiResponser(res, { updatedEmployee })
    } catch (error) {
        next(error)
    }
}
async function deleteEmployee(req, res, next) {

    const { id } = req.params
    try {
        const employee = await db.employee.findByPk(id)
        if (!employee) throw new ApiError('المستخدم غير موجود')
        await employee.destroy();
        res.status(200).json('done')
    } catch (error) {
        next(error)
    }
}
module.exports = {
    getEmployees,
    addemployee,
    login,
    getEmployeeByTd,
    updateEmolyee,
    deleteEmployee
}
