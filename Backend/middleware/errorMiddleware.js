const notFound = (req,res,next) => {
    const error = new Error(`Not Found - ${req.orignalURL}`)
    res.status(404)
    next(error)
}


const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.send({
        message: err.message,
        status: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
}

module.exports = {errorHandler,notFound}