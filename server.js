import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import notFoundMiddleware from './middleware/notFound.js'
import errorMiddleware from './middleware/Error.js'
import 'express-async-errors'
import morgan from 'morgan'
import authRouter from './routes/authRoute.js'
import cookieParser from 'cookie-parser'
import { userAuthentication } from './middleware/authentication.js'
import { adminAuthorization } from './middleware/authorization.js'

dotenv.config()
const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
app.use(cors())


app.get("/api", (req, res) => {
    res.status(200).json({msg: "hello from home route of xProject"})
})

// cookies test router, should be removed before production
app.get("/api/cookie", (req, res) => {
    console.log(req.cookies)
    console.log(req.signedCookies);
    res.send("cookies been logged")

})

// authentication test, should be removed before production
app.get('/api/authenticated', userAuthentication, (req, res) => {
    res.status(200).json({msg: "You are authenticated user", success: true})
})

// authorization test, should be removed before production
app.get('/api/admin', userAuthentication, adminAuthorization, (req, res) => {
    res.status(200).json({msg: "You are an admin user", success: true})
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