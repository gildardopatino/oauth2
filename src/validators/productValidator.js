const {body, validationResult} = require('express-validator');

exports.createProductValidator = [
    body('title').notEmpty().withMessage('El titulo del producto es obligatorio'),
    body('price').isFloat({gt:0}).withMessage('El precio del producto debe ser mayor a 0'),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
];