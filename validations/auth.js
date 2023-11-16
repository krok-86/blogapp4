const Registration = require('express');
const registration = new Registration();
const {body} = require("express-validator");
const reg = [
body('email', 'Неверный формат почты').isEmail(),
body('password','Пароль должен содержать минимум 5 символов').isLength({ min: 5 }),
body('name','Имя должно содержать минимум 3 символа').isLength({ min: 3 }),
];

// reg(body)
// console.log(reg)
module.exports = reg;
console.log (">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",registration)