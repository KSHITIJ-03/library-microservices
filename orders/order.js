const express = require("express")
const app = express()
const morgan = require("morgan")
const axios = require("axios")

app.use(morgan("dev"))
app.use(express.json())

const dotenv = require("dotenv")
dotenv.config({path : "./config.env"})

const mongoose = require("mongoose")
const Order = require("./orderModel")

const DB = process.env.DB.replace("<PASSWORD>", process.env.DB_PASSWORD)

mongoose.connect(DB).then(con => {
    console.log("database connected");
})

app.post("/order", async(req, res) => {
    try {
        console.log("hello");
        const customerId = req.body.customerId
        const bookId = req.body.bookId

        console.log(customerId, bookId);
        const order = await Order.create({
            customerId,
            bookId
        })
        console.log("hello");
        res.status(201).json({status : "success", order})
    } catch(err) {
        console.error("Error creating order:", err); // Log the error
        res.status(500).json({status : "fail", message :err})
    }

})

app.get("/order/:id", async(req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        console.log(order);
        if(order) {
            const customer = await axios.get(`http://localhost:4546/customer/${order.customerId}`)
            console.log(customer.data.customer.name);

            const book = await axios.get(`http://localhost:4545/book/${order.bookId}`)
            console.log(book.data.book.title);

            const result = {
                _id : order._id,
                customer : customer.data.customer.name,
                book : book.data.book.title
            }

            return res.status(200).json({
                status : "success",
                order : result
            })

        } else {
            return res.status(404).json({status : "fail", message : "order not found"})
        }
    } catch(err) {
       res.status(500).json({status : "fail", message :"internal server error"})
    }
})

app.listen(4547, () => {
    console.log("customer started on port 4547");
})