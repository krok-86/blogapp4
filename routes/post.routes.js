const Router = require('express');
const router = new Router();
const postController = require('../controller/post.controller');

//create user(author)
router.post('/', postController.createPost);
router.get('/', postController.getPosts);
router.get('/:id', postController.getOnePost);
router.delete('/:id', postController.deletePost);
router.put('/:id', postController.updatePost);

module.exports = router;