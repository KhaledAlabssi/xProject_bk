import customError from "../errors/customError.js";
import { isTokenValid } from "../util/jwt.js";
const userAuthentication = async (req, res, next) => {
    const token = req.signedCookies.token
    if (!token) {
        throw new customError("You are not authenticated", 401)
    }
    try {
        const {name, userId, role} = isTokenValid({ token })
        req.user = {name, userId, role}
        next()
    } catch (err) {
        console.error(err);
        throw new customError("You are not authenticated", 401)
    }
}

export {userAuthentication}