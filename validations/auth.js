// const Registration = require('express');
// const registration = new Registration();
const {body} = require("express-validator");

const registerValidation = [
body('email', 'wrong format email').isEmail(),
body('password', 'password must have more than 5 symbols').isLength({ min: 5 }), 
body('name', 'mame must have more than 5 symbols').isLength({ min: 3 }),
];

module.exports = registerValidation;
