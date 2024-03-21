const express = require("express")

const app = express()

const morgan = require("morgan")

app.use(morgan("dev"))
app.use(express.json())

const Books = require("./bookModel")

const dotenv = require("dotenv")
dotenv.config({path : "./config.env"})

const mongoose = require("mongoose")
const Book = require("./bookModel")

const DB = process.env.DB.replace("<PASSWORD>", process.env.DB_PASSWORD)

mongoose.connect(DB).then(con => {
    console.log("database connected");
})

app.get("/", (req, res) => {
    res.send("hello from books service")
})

app.get("/books", async(req, res) => {
    try {
        const books = await Book.find()
        res.status(200).json({
            status : "success",
            count : books.length,
            books
        })
    } catch(err) {
        res.status(500).json({status : "fail", message : "server internal error"})
    }
})

app.post("/book", async(req, res) => {
    try {
        const book = await Books.create({
            title : req.body.title,
            author : req.body.author,
            publisher : req.body.publisher
        })
        res.status(201).json({
            status : "success",
            book
        })
    } catch(err) {
        res.status(500).json({
            status : "fail",
            message : err
        })
    }
})

app.get("/book/:id", async(req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        res.status(200).json({status : "success", book})
    } catch(err) {
        res.status(404).json({status : "fail", message : "Book not found"})
    }
})

app.listen(4545, () => {
    console.log("books running on port 4545");
})