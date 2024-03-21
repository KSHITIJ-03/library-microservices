const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    customerId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    bookId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    }
})

const Order = new mongoose.model("Order", orderSchema)

module.exports = Order