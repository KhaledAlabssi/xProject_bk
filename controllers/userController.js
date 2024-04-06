import User from "../models/user.js"
import CustomError from "../errors/customError.js"
import { isTokenValid } from "../util/jwt.js"


const getProfile = async (req, res) => {
    
    res.status(200).json({user: req.user, success: true})
}

const updateProfile = async (req, res) => {
    
    
    res.send("update user")
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
    
    res.status(200).json({msg: "Password updated successfully", success: true})
}

export {getProfile, updateProfile, updatePassword}