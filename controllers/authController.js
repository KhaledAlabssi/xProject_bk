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
    res.status(200).json({ msg: "login user" })
}

const logout = async (req, res) => {
    res.status(200).json({ msg: "logout user" })
}

export {signup, login, logout}