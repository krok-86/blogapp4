const Router = require('express');
const router = new Router();
const userController = require('../controller/user.controller');

//create user(author)
router.post('/', userController.createUser);
router.post('/auth', userController.authorizationUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getOneUser);
router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.updateUser);

module.exports = router;