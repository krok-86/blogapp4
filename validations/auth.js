const {body} = require("express-validator");

const registerValidation = [
body('email', 'invalid email format').isEmail(),
body('password', 'password must have more than 5 symbols').isLength({ min: 5 }), 
body('name', 'name must have more than 5 symbols').isLength({ min: 3 }),
];

const loginValidation = [
body('email', 'invalid email format').isEmail(),
body('password', 'password must have more than 5 symbols').isLength({ min: 5 })
];

const postCreateValidation = [
body('postText', 'enter article text' ).isLength({ min: 3 }).isString(),//postText or post?
];
module.exports = 
registerValidation, 
loginValidation, 
postCreateValidation;

// const { body } = require("express-validator");

// const registerValidation = [
//   body('email', 'invalid email format').isEmail(),
//   body('password', 'password must have more than 5 symbols').isLength({ min: 5 }), 
//   body('name', 'name must have more than 5 symbols').isLength({ min: 3 }),
// ];

// const loginValidation = [
//   body('email', 'invalid email format').isEmail(),
//   body('password', 'password must have more than 5 symbols').isLength({ min: 5 })
// ];

// const postCreateValidation = [
//   body('postText', 'enter article text' ).isLength({ min: 3 }).isString(),
// ];

// module.exports = {
//   registerValidation,
//   loginValidation,
//   postCreateValidation
// };