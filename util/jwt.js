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

const tokenToResponse = ({ res, user }) => {
    const token = creatToken({ payload: user })
    res.cookie('token', token, {
        withCredentials: true,
        httpOnly: true,
        signed: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),

    })
}

export {creatToken, isTokenValid, tokenToResponse}