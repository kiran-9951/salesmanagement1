const Agents =require("../models/agentModel")
const Sales =require("../models/saleModel")
const SalesSummary = async (req, res) => {
    try {
        const agentemail = req.params.agent_email;

        // Find the agent by email
        const agent = await Agents.findOne({ email: agentemail });

        if (!agent) {
            return res.status(404).json({ message: "Agent not registered" });
        }

        // Use aggregation to calculate the total amount and fetch sales details
        const salesSummary = await Sales.aggregate([
            {
                $match: { agentemail: agentemail } // Match sales for the specific agent
            },
            {
                $unwind: "$productdetails" // Unwind the productdetails array to work on each product individually
            },
            {
                $group: {
                    _id: "$agentemail", // Group by agent email
                    totalAmount: {
                        $sum: {
                            $multiply: ["$productdetails.quantity", "$productdetails.price"] // Multiply quantity by price for total amount
                        }
                    },
                    sales: { $push: "$$ROOT" } // Collect the sales data for the response
                }
            }
        ]);

        // Check if sales summary exists
        if (salesSummary.length === 0) {
            return res.status(404).json({ message: "No sales found for this agent" });
        }

        const result = salesSummary[0]; // There should be only one result since we are grouping by agentemail

        // Send response with the sales summary
        res.status(200).json({
            message: "Sales fetched successfully",
            totalAmount: result.totalAmount,
            sales: result.sales
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error", error });
    }
};

module.exports = SalesSummary;
