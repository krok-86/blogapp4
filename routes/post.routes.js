const Router = require('express');
const router = new Router();
const postController = require('../controller/post.controller');

//create user(author)
router.post('/posts', postController.createPost);
router.get('/posts', postController.getPosts);
router.get('/posts/:id', postController.getOnePost);
router.delete('/posts/:id', postController.deletePost);
router.put('/posts/:id', postController.updatePost);

module.exports = router;