const Router = require('express');
const router = new Router();
const userController = require('../controller/user.controller');
const checkAurh = require('../utils/checkAuth');

//create user(author)
// router.post('/', userController.createUser);
// router.post('/auth', userController.authUser);

router.post('/registration', userController.registrationUser);

router.post('/authorization', userController.authorizationUser);
router.get('/authorization/me', checkAurh, userController.authorizationMeUser);

router.get('/', userController.getUsers);
router.get('/:id', userController.getOneUser);
router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.updateUser);

module.exports = router;