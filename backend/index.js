import express from "express"
import { PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose"
import { Book } from "./models/bookModels.js"

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('Bce cool')
})

// save a new book
app.post('/books', async(req, res) => {
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({ message: "Send all required fields" })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }
        const book = await Book.create(newBook)

        return res.status(201).send(book)
    } catch(error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

// get all Books
app.get('/books', async(req,res) => {
    try{
        const books = await Book.find({})

        return res.status(200).json({
            count: books.length,
            data: books
        })
    }
    catch(error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

// get book for id  
app.get('/books/:id', async(req,res) => {
    try{
        const { id } = req.params
        const book = await Book.findById(id)

        return res.status(200).json(book)
    }
    catch(error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

// update book
app.put('/books/:id', async(req,res) => {
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
           return res.status(400).send({ message: "Send all required fields" })
        }

        const { id } = req.params
        const result = await Book.findByIdAndUpdate(id, req.body)

        if(!result){
            return res.status(404).send({ message:"Book not found" })
        }

        return res.status(200).send({ message: "Book updated successfully" })
    }
    catch(error){
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

// delete book
app.delete('/books/:id', async(res, req) => {
    try{
        const { id } = req.params
        const result = await Book.findByIdAndDelete(id)

        if(!result){
            return res.status(404).send({ message:"Book not found" })
        }
        return res.status(200).send({ message: "Book delete successfully" })
    }
    catch(error){
        console.log(error.message)
        res.status(500).send({ message:error.message })
    }
})

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("Data base connected")
        app.listen(PORT, () => {
            console.log(`Все работает : ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })
