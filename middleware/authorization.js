import customError from "../errors/customError.js";

const adminAuthorization = (req, res, next) => {
    if (req.user.role !== 'admin') {
        throw new customError("You are unauthorized", 403)
    }
    next()

}

export {adminAuthorization}