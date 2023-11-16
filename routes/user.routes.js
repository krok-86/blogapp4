const Router = require('express');
const router = new Router();
const userController = require('../controller/user.controller');

//create user(author)
router.post('/users', userController.createUser);
router.post('/users/auth', userController.authorizationUser);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getOneUser);
router.delete('/users/:id', userController.deleteUser);
router.put('/users/:id', userController.updateUser);

module.exports = router;