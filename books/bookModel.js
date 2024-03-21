const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title : {
        type : String,
        require : [true, "book name is required"],
    },
    author : {
        type : String,
        require : true
    },
    publisher : {
        type : String,
        require : true
    }
})

const Book = new mongoose.model("Book", bookSchema)

module.exports = Book