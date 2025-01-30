const ApiError = require("../helpers/apiError");
const db = require("../models");

exports.checkPermission = (permission) => {
    return async (req, res, next) => {
        const employeeRoleId = req.employee ? req.employee.role_id : 'anonymous';
        console.log(req.employee)
        const role = await db.Role.findByPk(employeeRoleId)
        console.log(role)
        if (!role) return res.status(403).json({ error: 'role not exit' });
        if (role.permissions.includes(permission)) {
            return next();
        } else {
            return res.status(403).json({ error: 'Access denied' });
        }
    };
};