const joi =require("joi")

const prodctValidationSchema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    description: joi.string().required(),
})

module.exports ={prodctValidationSchema}