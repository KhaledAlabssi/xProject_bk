import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import notFoundMiddleware from './middleware/notFound.js'
import errorMiddleware from './middleware/Error.js'
import 'express-async-errors'
import morgan from 'morgan'
import authRouter from './routes/authRoute.js'

dotenv.config()
const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())


app.get("/", (req, res) => {
    res.status(200).json({msg: "hello from home route of xProject"})
})

app.use('/api/auth', authRouter)

// testing error middleware
app.get("/err", () => {
    throw new Error("Home made error.")
})

app.use(notFoundMiddleware)
app.use(errorMiddleware)
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