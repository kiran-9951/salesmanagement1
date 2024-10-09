const joi = require("joi");
const leadsValidationSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    phone: joi.string().length(10).pattern(/^\d+$/).required().messages({
        'string.length': 'Phone number must be exactly 10 digits long.',
        'string.pattern.base': 'Phone number must contain only digits.'
    }),
    age: joi.number().integer().min(1).required(),
    country: joi.string().required(),
    state: joi.string().required(),
    city: joi.string().required(),
    pincode: joi.number().integer().min(6).required(),
    agentemail: joi.string().email().required()
})

module.exports ={leadsValidationSchema}