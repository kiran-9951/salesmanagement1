const Sales = require("../models/saleModel");
const Products = require("../models/productModel");
const Agents = require("../models/agentModel");

const SalesSummary = async (req, res) => {
    try {
        const agentemail = req.params.agent_email;

     
        if (!agentemail) {
            return res.status(400).json({ message: "Agent email is required" });
        }

  
        const agent = await Agents.findOne({ email: agentemail });
        if (!agent) {
            return res.status(404).json({ message: "Agent not registered" });
        }

        
        const sales = await Sales.find({ agentemail: agentemail }).populate({
            path: "productdetails.product",
            model: "Products"
        });

      
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

      
        res.status(200).json({
            message: "Sales fetched successfully",
            totalAmount: totalAmount,
            sales: sales
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

module.exports = SalesSummary;
