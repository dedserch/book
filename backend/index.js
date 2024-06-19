import express from "express"
import { PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose"
import booksRoute from "./routers/booksRoute.js"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET','POST',"PUT","DELETE"],
//     allowedHeaders: ['Content-type'],
// }))

app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('Bce cool')
})

app.use('/books', booksRoute)

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
