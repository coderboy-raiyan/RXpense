function createAsyncError(theFunc) {
    return function (req, res, next) {
        Promise.resolve(theFunc(req, res, next)).catch(next);
    };
}

module.exports = createAsyncError;
