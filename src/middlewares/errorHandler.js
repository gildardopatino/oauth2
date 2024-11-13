const logger = require('./logger');

const errorHandler = (err, req, res, next) => {
    logger.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Error de servidor',
        error: process.env.NODE_ENV === 'development' ? err.stack : {},
        url: req.originalUrl,
        method: req.method,
        params: req.params,
        errorCode: err.status,
        errorMessage: err.errorMessage,
        time: new Date(),
        errorImage: 'http://xxxxyyy.com/imageerror.png'
    });
}

module.exports = errorHandler;