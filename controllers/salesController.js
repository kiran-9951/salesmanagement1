const Agents = require("../models/agentModel")
const Leads = require("../models/leadsModel")
const Sales = require("../models/saleModel")

const SalesData = async (req, res) => {
    try {
        const { agentemail, customeremail, productdetails } = req.body

        console.log(agentemail,customeremail,productdetails)

        if (!agentemail || !customeremail || !productdetails) {
            return res.status(404).json({ message: "provide agentemail customeremail productdetails" })
        }

        const agent = await Agents.findOne({ email: agentemail });

        if (!agent) {
            return res.status(404).json({ message: "agent not found" })
        }
        const lead = await Leads.findOne({ email: customeremail });

        if (!lead) {
            return res.status(404).json({ message: "customerlead not found" })
        }

        const existsale = await Sales.findOne({ agentemail: agentemail, customeremail: customeremail })

        if (existsale) {
            return res.status(409).json({ message: "agent already completed a sale for this customer" })

        }

        const newsale = new Sales({
             agentemail,
             customeremail,
             productdetails
        })
        
        await newsale.save()

        res.status(201).json({ message: "successfully sale craeted", sale: newsale })

    }
    catch (error) {
        res.status(505).json({ message: "internal server error", error })
    }
}
module.exports = SalesData