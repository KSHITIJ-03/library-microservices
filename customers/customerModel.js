const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    }
})

const Customer = new mongoose.model("Customer", customerSchema)

module.exports = Customer