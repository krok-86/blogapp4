const Registration = require('express');
const registration = new Registration();
const {body} = require("express-validator");
const reg = (body) => {
    return[
body('email').isEmail(),
body('password').isLength({ min: 5 }),
body('name').isLength({ min: 3 }),
];
}
reg(body)
module.exports = registration;
console.log (">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",registration)