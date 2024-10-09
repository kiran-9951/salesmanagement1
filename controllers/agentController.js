const Agents = require("../models/agentModel");
const { agentValidattionSchema } = require("../validations/agentValidation");
const Agentsdata = async (req, res) => { 
    try {
        const { name, email, phone, company_id } = req.body
       
        const {value, error} = agentValidattionSchema.validate(req.body, { abortEarly: false })
       
        if(error){
            const formattedErrors = error.details.map(err => ({
                field: err.context.key,
                message: err.message
            }));
            
            return res.status(400).send({
                message: "Validation failed",
                errors: formattedErrors
            })
        }
        const existedagent = await Agents.findOne({ email:email });
        
        if (existedagent) {
            return res.status(404).json({ message: "agent  already exist" })
        }
        const agent = new Agents({
            name: name,
            email: email,
            phone: phone,
            company_id: company_id
        })

        await agent.save()

        res.status(201).json({ message: "agent created successfully", status: "success",data: agent })

    }
    catch (error) {
        res.status(505).json({ message: "internla server error" }, error)

    }
}

module.exports = Agentsdata