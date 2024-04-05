import User from '../models/user.js'
import { tokenToResponse } from '../util/jwt.js';

const signup = async (req, res) => {
    // const { email } = req.body;
    // const emailExists = await User.findOne({ email })
    // if (emailExists) {
    //     throw new Error("email is already exists")
    // }
    // don't return user in production, this will be only for dev

    // user can't register as admin, it should be done manually for now
    const { name, password, email } = req.body;
    const user = await User.create({ name, password, email })
    const tokenInfo = { name: user.name, userId: user._id, role: user.role }
    tokenToResponse({res, user: tokenInfo})
    
    
    res.status(201).json({user: tokenInfo, success: true})
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

export {signup, login, logout}