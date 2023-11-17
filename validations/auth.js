const Registration = require('express');
const registration = new Registration();
const {body} = require("express-validator");

const registerValidation = [
body('email').isEmail(),
body('password').isLength({ min: 5 }), 
body('name').isLength({ min: 3 }),
];

module.exports = registerValidation;
// console.log (">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",registerValidation)


// import {body} from 'express-validator';

// export const registerValidator = [
//   body('email').isEmail(),
//   body('password').isLength({ min: 5 }),
//   body('name').isLength({ min: 3 }),
// ]

// body('email', 'Неверный формат почты').isEmail(),
// body('password','Пароль должен содержать минимум 5 символов').isLength({ min: 5 }),
// body('name','Имя должно содержать минимум 3 символа').isLength({ min: 3 }),