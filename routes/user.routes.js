const Router = require('express');
const router = new Router();
const userController = require('../controller/user.controller');
const checkAuth = require('../utils/checkAuth');
const [registerValidation, loginValidation] = require("../validations/auth");
const handleValidationErrors = require('../utils/handleValidationErrors');


//create user(author)
router.post('/registration', registerValidation, handleValidationErrors, userController.registrationUser);
router.post('/authorization', loginValidation, handleValidationErrors, userController.authorizationUser);//loginValidation - it's work?
router.get('/authorization/me', checkAuth, loginValidation, handleValidationErrors, userController.authorizationMeUser);//where is more add checkAuth? And handleValidationErrors needs here?
router.get('/', userController.getUsers);
router.get('/:id', userController.getOneUser);
router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.updateUser);

module.exports = router;