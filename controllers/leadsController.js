const Leads = require("../models/leadsModel")
const Agents = require("../models/agentModel")
const {leadsValidationSchema}= require("../validations/leadsValidation")
const { agentValidattionSchema } = require("../validations/agentValidation")
const Agentleads = async (req, res) => {
    try {
        const { name, email, age, phone, country, state, pincode, city, agentemail } = req.body

        // console.log(name, email, age, phone, country, state, pincode, city, agentemail)

        // if (!name || !email || !age || !phone || !country || !state || !pincode || !city) {
        //     return res.status(404).json({ message: "please provide all details name, email, age, phone, country, state, pincode, city, agentemail  " })
        // }
const {value,error} =agentValidattionSchema.validate(req.body,{abortEarly:false})

if(error){
    
}
        if (!agentemail) {
            return res.status(404).json({ message: "agent email is required to show leads" })
        }

        const Agent = await Agents.findOne({ email: agentemail })

        if (!Agent) {
            return res.status(404).json({ message: "agent don't have anyleads" })
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