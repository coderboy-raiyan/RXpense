function notFound(__req, _res, next) {
    const error = new Error('Resource not found!');
    error.status = 400;
    next(error);
}

function globalErrorHandler(error, _req, res) {
    console.log(error);
    if (error.status) {
        return res.status(error.status).json({ message: error.message });
    }

    return res
        .status(500)
        .json({ message: error.message ? error.message : 'Something went wrong !' });
}

module.exports = { notFound, globalErrorHandler };
