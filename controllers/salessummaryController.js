const SalesSummary = async (req, res) => {
    try {
        const agentemail = req.params.agent_email;

        const agent = await Agents.findOne({ email: agentemail });

        if (!agent) {
            return res.status(404).json({ message: "Agent not registered" });
        }

        const salesSummary = await Sales.aggregate([
            {
                $match: { agentemail: agentemail }
            },
            {
                $unwind: "$productdetails"
            },
            {
                $lookup: {
                    from: "products",
                    localField: "productdetails.product",
                    foreignField: "_id",
                    as: "product"
                }
            },
            {
                $unwind: "$product"
            },
            {
                $group: {
                    _id: "$agentemail",
                    totalAmount: {
                        $sum: {
                            $multiply: ["$productdetails.quantity", "$product.price"]
                        }
                    },
                    sales: { $push: "$$ROOT" }
                }
            }
        ]);

        if (salesSummary.length === 0) {
            return res.status(404).json({ message: "No sales found for this agent" });
        }

        const result = salesSummary[0];

        res.status(200).json({
            message: "Sales fetched successfully",
            totalAmount: result.totalAmount,
            sales: result.sales
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

module.exports = SalesSummary;
