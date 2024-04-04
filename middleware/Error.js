const errorMiddleware = (err, req, res, next) => {
    console.error(err.message)
    let customError = {
        statusCode: 500,
        msg: "Something went wrong, please try again later"
    }
    return res.status(customError.statusCode).json({msg: err.message || customError.msg})
}

export default errorMiddleware