const joi = require("joi")


// agent validation schema
const agentValidattionSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    phone:joi.string().length(10).pattern(/^\d+$/).required().messages({
        'string.length': 'Phone number must be exactly 10 digits long.',
        'string.pattern.base': 'Phone number must contain only digits.'
    }),
    company_id: joi.number().integer().min(1).required()
});
module.exports = {agentValidattionSchema};