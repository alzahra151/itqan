
const Joi = require('joi');
const ApiError = require('../../helpers/apiError');

const validateRequest = (schema) => {

    return (req, res, next) => {
        const result = schema.validate(req.body, { abortEarly: false });
        if (result.error) {
            console.log(result)
            const errors = result.error.details
            throw new ApiError(errors, 400)
        }
        if (!req.value) {
            req.value = {};
        }
        req.value['body'] = result.value;
        next();
    };
};

module.exports = { validateRequest }