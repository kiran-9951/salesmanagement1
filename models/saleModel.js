const mongoose = require("mongoose");
const salesSchema = new mongoose.Schema({
    agentemail: {
        type: String,
        required: true,
        ref: "Agents"
    },

    customeremail: {
        type: String,
        required: true,
        ref: "Leads"
    },
    productdetails: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],

    saledate: {
        type: Date,
        default: Date.now()
    }
})

// "this is a method which makes unique  the product details in the sales schema"

salesSchema.index({agentemail:1,customeremail:1},{unique:true})


const Sales = mongoose.model("Sales", salesSchema)
module.exports = Sales