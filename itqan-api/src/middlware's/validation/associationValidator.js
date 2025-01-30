const Joi = require('joi');

const schema = Joi.object().keys({
    name: Joi.string().trim().required()
        .messages({
            'string.base': 'الاسم يجب ان يكون حروف',
            'any.required': 'الاسم لا يجب ان يكون فارغ',
            'string.empty': 'الاسم لا يجب ان يكون فارغ',
        }),
    // description: Joi.string().min(10).trim().required()
    //     .messages({
    //         'string.base': 'الوصف يجب ان يكون حروف',
    //         'any.required': 'الوصف لا يجب ان يكون فارغ',
    //         'string.empty': 'الوصف لا يجب ان يكون فارغ',
    //         'string.min': 'الوصف لا يجب ان يكون اقل من 10 حروف',
    //     }),
    address: Joi.string().trim().required()
        .messages({
            'any.required': 'العنوان لا يجب ان يكون فارغ',
            'string.empty': 'العنوان لا يجب ان يكون فارغ',
        }),
    mobile: Joi.string().trim().required()
        .messages({
            'any.required': 'رقم الجوال لا يجب ان يكون فارغ',
            'string.empty': 'رقم الجوال لا يجب ان يكون فارغ',
        }),
    phone: Joi.string().trim().required()
        .messages({
            'any.required': 'رقم الهاتف لا يجب ان يكون فارغ',
            'string.empty': 'رقم الهاتف لا يجب ان يكون فارغ',
        }),
    CR_number: Joi.number().required()
        .messages({
            'any.required': 'رقم السجل لا يجب ان يكون فارغ',
            'number.base': 'رقم السجل يجب ان يكون ارقام',
            'number.empty': 'رقم السجل لا يجب ان يكون فارغ',
        }),
    tax_number: Joi.number().required()
        .messages({
            // 'any.only': 'رقم السجل يجب ان يكون ارقام',
            'number.base': 'الرقم الضريبي لا يجب ان يكون فارغ',
            'any.required': 'الرقم الضريبي  لا يجب ان يكون فارغ',
            'number.empty': ' الرقم الضريبي لا يجب ان يكون فارغ',
        }),
}).options({ allowUnknown: true });

module.exports = { schema }
