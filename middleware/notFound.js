const notFoundMiddleware = (req, res) => {
   
    let customError = {
        statusCode: 404,
        msg: "Route/api endpoint does not exist ya Ahmed"
    }
    return res.status(customError.statusCode).json({msg: customError.msg})
   
}

export default notFoundMiddleware;