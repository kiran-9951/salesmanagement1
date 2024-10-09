const Products = require("../models/productModel")
const { prodctValidationSchema } = require("../validations/productValidation")

const Agentproducts = async (req, res) => {
    try {
        const { name, price, description } = req.body

        const { value, error } = prodctValidationSchema.validate(req.body, { abortEarly: false })
        
        if (error) {
            const formattedErrors = error.details.map(err => ({
                field: err.context.key,
                message: err.message
            }));

            return res.status(400).json({ message: "validation failed", error: formattedErrors })
        }

        const existname = await Products.findOne({ name: name })
        if (existname) {
            return res.status(404).json({ message: "product name alredy exist" })
        }

        const newproduct = new Products({
            name,
            price,
            description
        })
        await newproduct.save()

        res.status(201).json({ message: "product created  successfully", newproduct })


    } catch (error) {
        res.status(505).json({ message: "internal server", error })

    }
}

module.exports = Agentproducts