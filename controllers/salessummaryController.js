const Sales = require("../models/saleModel");
const Products = require("../models/productModel");
const Agents = require("../models/agentModel");

const SalesSummary = async (req, res) => {
    try {
        const agentemail = req.params.agent_email;
        console.log(agentemail)

        const agent = await Agents.findOne({ email: agentemail });
        console.log(agent)
        if (!agent) {
            return res.status(404).json({ message: "Agent  registered" });
        }


        const sales = await Sales.find({ agentemail: agentemail }).populate({
            path: "productdetails.product",
            model: "Products"
        });
        console.log(sales)


        if (sales.length === 0) {
            return res.status(404).json({ message: "No sales found for this agent" });
        }


        let totalAmount = 0;
        sales.forEach(sale => {
            sale.productdetails.forEach(productDetail => {
                const productPrice = productDetail.product.price;
                const quantity = productDetail.quantity;

                totalAmount += productPrice * quantity;
            });
        });

        console.log("sales sumaerie")
        res.status(200).json({
            message: "Sales fetched successfully",
            totalAmount: totalAmount,
            sales: sales
        });

    } catch (error) {
        console.log("catch error: " , error)
        res.status(500).json({ message: "Internal server error", error });
    }
};

module.exports = { SalesSummary };  
