const ApiError = require("../helpers/apiError");
const jwt = require('jsonwebtoken')

async function authorization(req, res, next) {
    try {
        const token = req.header("authorization");
        const secure = /bearer+/gi.test(token);

        if (!token) throw new ApiError("غير مصرح ", 401);
        if (!secure) throw new ApiError("bearer is required", 401);

        // complete process
        const tokenValue = token.split(' ')[1];
        if (!tokenValue) throw new ApiError("غير مصرح", 401);
        jwt.verify(tokenValue, process.env.SECRET_KEY, (error, employee) => {
            if (error) throw new ApiError("Invalid or expired token", 401);
            req.employee = employee
        })
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = authorization;
