import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name data is missing'],
        minlength: 3,
        maxlength: 32
    },
    email: {
        type: String,
        unique: true,
        required: [true, "email data is missing"],
        validate: {
            validator: validator.isEmail,
            message: "Please provide a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Password is missing"],
        minlength: 6,
        maxlength: 32
    }, 
    role: {
        type: String,
        enum: ['user', 'employee', 'admin'],
        default: 'user'
    },
   
})

UserSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    this.password = await bcrypt.hash(this.password, 10)
})

UserSchema.methods.comparePassword = async function (clientPassword) {
    const isMatch = await bcrypt.compare(clientPassword, this.password)
    return isMatch
}

export default mongoose.model('User', UserSchema);