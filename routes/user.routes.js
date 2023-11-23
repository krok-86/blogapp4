const Router = require('express');
const router = new Router();
const userController = require('../controller/user.controller');
const checkAuth = require('../utils/checkAuth');
const validation = require("../validations/auth");
const handleValidationErrors = require('../utils/handleValidationErrors');

//create user(author)
router.post('/registration', validation.registerValidation, handleValidationErrors, userController.registrationUser);
router.post('/authorization',validation.loginValidation, handleValidationErrors, userController.authorizationUser);//handleValidationErrors, loginValidation - it's work?
router.get('/authorization/me', checkAuth, userController.authorizationMeUser);//validation.loginValidation, handleValidationErrors, ?
router.get('/', userController.getUsers);
router.get('/:id', userController.getOneUser);
router.delete('/:id', checkAuth, userController.deleteUser);
router.put('/:id', userController.updateUser);

module.exports = router;