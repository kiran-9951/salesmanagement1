const mongoose = require("mongoose");

const leadsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    agentemail:{
        type:String,
        ref:"agents",
        required:true
    },
    phone: {
        type: Number,
        required: true,
        unique:true
    },
    age: {
        type: Number,
        required: true
    },
    country: {

        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },

    pincode: {
        type: Number,
        required: true
    }
})

const Leads =  mongoose.model("Leads", leadsSchema)

module.exports = Leads
