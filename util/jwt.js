import jwt from 'jsonwebtoken'

const creatToken = ({ payload }) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    })
    return token
}

const isTokenValid = ({ token }) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

export {creatToken, isTokenValid}