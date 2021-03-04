const { check, validationResult } = require('express-validator');

exports.validateSignUpRequest = [
    check("firstName")
    .notEmpty()
    .withMessage("First Name is Required! "),

    check("lastName")
    .notEmpty()
    .withMessage("Last Name is Required! "),

    check("email")
    .isEmail()
    .withMessage("Email is Required! "),

    check("password")
    .notEmpty()
    .withMessage("Password is Required! ")
    .isLength({min: 6})
    .withMessage("Minimum 6 Length")
    .isAlphanumeric()
    .withMessage("Need a Alphanumeric Password")
];

exports.validateSignInRequest = [
    check("email")
    .isEmail()
    .withMessage("Email is Required! "),

    check("password")
    .notEmpty()
    .withMessage("Password is Required! "),
];


exports.isRequestValidated = (req,res,next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0 ){
        return res.status(400).json({error: errors.array()[0].msg});
    }
    next();
}

