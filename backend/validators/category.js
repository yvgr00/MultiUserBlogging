const {check} = require('express-validator');

exports.categoryCreateValidator = [
    check('name')
                .not()
                .isEmpty()
                .withMessage('name is required'),
            
    
];