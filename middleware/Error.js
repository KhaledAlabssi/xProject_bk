const errorMiddleware = (err, req, res, next) => {
    console.error(err)
    let customError = {
        statusCode: err.statusCode || 501,
        msg: err.message || "Something went wrong, please try again later"
    }
    if (err.name === "ValidationError") {
        customError.statusCode = 400
        customError.msg = Object.values(err.errors).map(i => i.message).join(" \n ")
    }
    if (err.code && err.code == 11000) {
        customError.statusCode = 400;
        customError.msg = `Value is exits for: ${Object.keys(err.keyValue)} field, please provide another value`
    }
    return res.status(customError.statusCode).json({msg: customError.msg, success: false})
}

export default errorMiddleware