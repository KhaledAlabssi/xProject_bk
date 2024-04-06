import User from "../models/user.js"
import CustomError from "../errors/customError.js"
import { isTokenValid, tokenToResponse } from "../util/jwt.js"


const getProfile = async (req, res) => {

    res.status(200).json({ user: req.user, success: true })
}

const updateProfile = async (req, res) => {
    const { email, name } = req.body;
    if (!email || !name) {
        throw new CustomError("Please provide all values")
    }
    const user = await User.findOne({ _id: req.user.userId })
    user.email = email
    user.name = name
    await user.save()
    const tokenInfo = { name: user.name, userId: user._id, role: user.role }
    tokenToResponse({res, user: tokenInfo})
    
    res.status(200).json({msg: "User updated successfully", success: true})
}

const updatePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body
    if (!oldPassword || !newPassword) {
        throw new CustomError("Please provide old and new passwords", 401)
    }
    const user = await User.findOne({ _id: req.user.userId })
    const correctPasswowrd = await user.comparePassword(oldPassword)
    if (!correctPasswowrd) {
        throw new CustomError("Old password doesn't match", 401)
    }
    user.password = newPassword
    await user.save()

    res.status(200).json({ msg: "Password updated successfully", success: true })
}

export { getProfile, updateProfile, updatePassword }