const express = require("express")
const app = express()
const morgan = require("morgan")

app.use(morgan("dev"))
app.use(express.json())

const dotenv = require("dotenv")
dotenv.config({path : "./config.env"})

const mongoose = require("mongoose")
const Customer = require("./customerModel")

const DB = process.env.DB.replace("<PASSWORD>", process.env.DB_PASSWORD)

mongoose.connect(DB).then(con => {
    console.log("database connected");
})

app.post("/customer", async(req, res) => {
    try {
        const customer = await Customer.create({
            name : req.body.name
        })
        res.status(201).json({status : "success", customer})
    } catch(err) {
        res.status(500).json({status : "fail", message : "internal error"})
    }
})


app.get("/customer/:id", async(req, res) => {
    try {
        const customer = await Customer.findById(req.params.id)
        res.status(201).json({status : "success", customer})
    } catch(err) {
        res.status(500).json({status : "fail", message : "internal error"})
    }
})

app.listen(4546, () => {
    console.log("customer started on port 4546");
})