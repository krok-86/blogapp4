const Router = require('express');
const router = new Router();
const postController = require('../controller/post.controller');
const checkAuth = require('../utils/checkAuth');
const handleValidationErrors = require('../utils/handleValidationErrors');

//create user(author)

router.post('/',checkAuth, handleValidationErrors, postController.createPost);// ?add: postCreateValidation, Is handleValidationErrors 
router.get('/', postController.getPosts);
router.get('/:id', postController.getOnePost);
router.delete('/:id',checkAuth, postController.deletePost);
router.put('/:id', checkAuth, postController.updatePost);//?add: postCreateValidation,

module.exports = router;