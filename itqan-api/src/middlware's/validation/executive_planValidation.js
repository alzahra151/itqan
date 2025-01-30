const Joi = require('joi');
const executive_planSchema = Joi.object().keys({
    name: Joi.string().trim().required()
        .messages({
            'string.base': 'الاسم يجب ان يكون حروف',
            'any.required': 'الاسم لا يجب ان يكون فارغ',
            'string.empty': 'الاسم لا يجب ان يكون فارغ',
        }),
    description: Joi.string().min(10).trim().required()
        .messages({
            'string.base': 'الوصف يجب ان يكون حروف',
            'any.required': 'الوصف لا يجب ان يكون فارغ',
            'string.empty': 'الوصف لا يجب ان يكون فارغ',
            'string.min': 'الوصف لا يجب ان يكون اقل من 10 حروف',
        }),
    main_goal: Joi.string().trim().required()
        .messages({
            'string.base': 'الهدف العام يجب ان يكون حروف',
            'any.required': 'الهدف العام لا يجب ان يكون فارغ',
            'string.empty': 'الهدف العام لا يجب ان يكون فارغ',
        }),
    Requirements: Joi.string().trim().required()
        .messages({
            'string.base': ' المتطلبات يجب ان يكون حروف',
            'any.required': ' المتطلبات لا يجب ان يكون فارغ',
            'string.empty': ' المتطلبات لا يجب ان يكون فارغ',
        }),
    expected_impact: Joi.string().trim().required()
        .messages({
            'string.base': ' الاثر التنموي المتوقع يجب ان يكون حروف',
            'any.required': ' الاثر التنموي المتوقع لا يجب ان يكون فارغ',
            'string.empty': ' الاثر التنموي المتوقع لا يجب ان يكون فارغ',
        }),
    cost: Joi.number().required()
        .messages({
            'any.required': ' التكلفة لا يجب ان يكون فارغ',
            'number.base': 'التكلفة  يجب ان يكون ارقام',
            'number.empty': ' التكلفة لا يجب ان يكون فارغ',
        }),
    activity_id: Joi.number().required()
        .messages({
            'any.required': 'النشاط مطلوب',
            'number.base': 'النشاط مطلوب',
            'number.empty': 'النشاط مطلوب',
        }),

    Strategic_plan_id: Joi.number().required()
        .messages({
            'any.required': 'الهدف الاستراتيجي مطلوب',
            'number.base': 'الهدف الاستراتيجي مطلوب',
            'number.empty': 'الهدف الاستراتيجي مطلوب',
        }),
    beneficiary_id: Joi.number().required()
        .messages({
            'any.required': 'المنتفع مطلوب',
            'number.base': 'المنتفع مطلوب',
            'number.empty': 'المنتفع مطلوب',
        }),

}).options({ allowUnknown: true });

module.exports = { executive_planSchema }
