const Joi = require('joi');

const administrationSchema = Joi.object().keys({
    name: Joi.string().trim().required()
        .messages({
            'string.base': 'الاسم يجب ان يكون حروف',
            'any.required': 'الاسم لا يجب ان يكون فارغ',
            'string.empty': 'الاسم لا يجب ان يكون فارغ',
        }),
}).options({ allowUnknown: true });

module.exports = { administrationSchema }
