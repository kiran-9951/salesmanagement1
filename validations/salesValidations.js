const joi =require("joi");
const salesValidationSchema =joi.object({
    agentemail:joi.string().email().required(),
    customeremail:joi.string().email().required(),
    productid:joi.number().integer().required(),
})

module.exports ={salesValidationSchema}