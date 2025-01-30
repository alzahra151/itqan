const Joi = require('joi');

const departmentSchema = Joi.object().keys({
    name: Joi.string().trim().required()
        .messages({
            'string.base': 'اسم القسم لا يجب ان يكون فارغ ويجب ان يكون حروف',
            'any.required': 'الاسم لا يجب ان يكون فارغ',
            'string.empty': 'الاسم لا يجب ان يكون فارغ',
        }),
}).options({ allowUnknown: true });

module.exports = { departmentSchema }