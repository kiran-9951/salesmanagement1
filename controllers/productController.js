const Products = require("../models/productModel")

const Agentproducts = async (req, res) => {
    try {
        const { name, price, description } = req.body
        
        console.log(name,  price, description)

        if (!name || !price || !description) {
            return res.status(404).json({ message: "provide  name, price, description" })
        }

        const existname =await Products.findOne({name:name})
        if(existname){
            return res.status(404).json({message:"product name alredy exist"})
        }

        const newproduct = new Products({
            name,
            price,
            description
        })
        await  newproduct.save()

        res.status(201).json({ message: "product created  successfully", newproduct })


    } catch (error) {
        res.status(505).json({message:"internal server",error})

    }
}

module.exports = Agentproducts