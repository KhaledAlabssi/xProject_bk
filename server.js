import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'

dotenv.config()
const app = express()

const port = 5000 || process.env.port;
const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
            .then(() => console.log("Mongo is connected"))
            .catch(err => console.error(err))
        app.listen(port, () => {
            console.log(`Server is running on prot: ${port}`);
        })
    } catch (error) {
        console.error(error)
    }
}

start()