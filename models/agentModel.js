const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    company_id: {
        type: Number,
        required: true
    }
})

const Agents = mongoose.model("Agents", agentSchema);
module.exports = Agents;