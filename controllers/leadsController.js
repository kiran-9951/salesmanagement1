const Leads = require("../models/leadsModel")
const Agents = require("../models/agentModel")
const { leadsValidationSchema } = require("../validations/leadsValidation")

const Agentleads = async (req, res) => {
    try {
        const { name, email, age, phone, country, state, pincode, city, agentemail } = req.body

        const { value, error } = leadsValidationSchema.validate(req.body, { abortEarly: false })

        if (error) {
            const formattedErrors = error.details.map(err => ({
                field: err.context.key,
                message: err.message
            }));

            return res.status(400).json({ message: "validation failed", error: formattedErrors })
        }
        if (!agentemail) {
            return res.status(404).json({ message: "agent email is required to show leads" })
        }

        const Agent = await Agents.findOne({ email: agentemail })

        if (!Agent) {
            return res.status(404).json({ message: "agent don't have anyleads" })
        }

        const leadexist = await Leads.findOne({email:email})
        const leadexists=await Leads.findOne({phone:phone})
        if(leadexist && leadexists){
            return res.status(404).json({message:"lead already exist"})
        }


        const newlead = new Leads({
            name, email, age, phone, country, state, pincode, city, agentemail

        })
        await newlead.save()

        res.status(201).json({ message: "leads generated", data: newlead })

    } catch (error) {
        res.status(500).json({ message: "internal-server error", error })
    }
}

module.exports = Agentleads