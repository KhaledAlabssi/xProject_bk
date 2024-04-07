import CustomError from '../errors/customError.js';
import User from '../models/user.js'
import { tokenToResponse } from '../util/jwt.js';
import crypto from 'crypto'

const signup = async (req, res) => {
    // const { email } = req.body;
    // const emailExists = await User.findOne({ email })
    // if (emailExists) {
    //     throw new Error("email is already exists")
    // }
    // don't return user in production, this will be only for dev
    // user can't register as admin, it should be done manually for now
    const { name, password, email } = req.body;

    const verificationToken = crypto.randomBytes(32).toString("hex")
    const user = await User.create({ name, password, email, verificationToken })
    // const tokenInfo = { name: user.name, userId: user._id, role: user.role}
    // tokenToResponse({res, user: tokenInfo})


    // res.status(201).json({user: tokenInfo, success: true})
    // send verification only in postman for now
    res.status(200).json({ msg: "please check your email for verificaiton", success: true, verificationToken: user.verificationToken })
}

const verifyEmail = async (req, res) => {
    const { verificationToken, email } = req.body
    res.status(200).json({verificationToken, email})
}

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new Error("Please provide email and password")
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error("Invalid email or password")
    }
    const correctPassword = await user.comparePassword(password)
    if (!correctPassword) {
        throw new Error("Invalid email or password")
    }

    if (!user.isVerified) {
        throw new CustomError("Please verify your email first", 401)
    }

    const tokenInfo = { name: user.name, userId: user._id, role: user.role }
    tokenToResponse({ res, user: tokenInfo })

    res.status(200).json({ user: tokenInfo, success: true })
}

const logout = async (req, res) => {
    res.cookie("token", "empty_token", {
        httpOnly: true,
        signed: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now())
    })

    res.status(200).json({ msg: "logout user", success: true })
}

export { signup, login, logout,verifyEmail }